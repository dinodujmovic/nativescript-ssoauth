import { Color } from 'tns-core-modules/color';
import * as app from 'tns-core-modules/application';
import * as utils from 'tns-core-modules/utils/utils';
import { AppURL, extractAppURL } from './ssoauth.common';
const REQUEST_CODE = 1868;

enum NavigationEvent {
	Started = 1,
	Finished,
	Failed,
	Aborted,
	TabShown,
	TabHidden
}

interface UrlHandlerCallback {
	(url: string): void;
}

let URL_HANDLER_CALLBACK: UrlHandlerCallback;

function getUrlHandleCallback(): UrlHandlerCallback {
	if (!URL_HANDLER_CALLBACK) {
		URL_HANDLER_CALLBACK = function() {
			console.error('No callback.');
		};
	}
	return URL_HANDLER_CALLBACK;
}

function handleOpenURL(handler: UrlHandlerCallback): void {
	URL_HANDLER_CALLBACK = handler;
}

export function init() {
	co.fitcom.fancywebview.AdvancedWebView.init(utils.ad.getApplicationContext(), true);
}

app.android.on(app.AndroidApplication.activityCreatedEvent, args => {
	let intent: android.content.Intent = args.activity.getIntent();
	let data = intent.getData();
	try {
		let appURL = data;
		if (
			appURL != null &&
			(new String(intent.getAction()).valueOf() === new String(android.content.Intent.ACTION_MAIN).valueOf() ||
				new String(intent.getAction()).valueOf() === new String(android.content.Intent.ACTION_VIEW).valueOf())
		) {
			try {
				getUrlHandleCallback()(appURL.toString());
			} catch (ignored) {
				app.android.on(app.AndroidApplication.activityResultEvent, () => {
					getUrlHandleCallback()(appURL.toString());
				});
			}
		}
	} catch (e) {
		console.error('Unknown error during getting App URL data', e);
	}
});

export function SSOAuthOpenUrl(options: SSOAuthOptions): void {
	if (!options.url) {
		throw new Error('No url set in the Advanced WebView Options object.');
	}

	let activity = app.android.startActivity || app.android.foregroundActivity;
	let isClosedManually: boolean = true;
	let redirectionUrl: string = '';

	app.android.on(app.AndroidApplication.activityResultEvent, (args: any) => {
		const requestCode = args.requestCode;
		const resultCode = args.resultCode;
		if (requestCode === REQUEST_CODE) {
			if (resultCode === android.app.Activity.RESULT_CANCELED) {
				if (options.onManualClose && typeof options.onManualClose === 'function') {
					options.onManualClose(true);
				}
				app.android.off(app.AndroidApplication.activityResultEvent);
			}
		}
	});

	const advancedWebViewListener = new co.fitcom.fancywebview.AdvancedWebViewListener({
		onCustomTabsServiceConnected(componentName: android.content.ComponentName, client: any) {},
		onServiceDisconnected(componentName: android.content.ComponentName) {},
		onNavigationEvent: function(navigationEvent: number, extras: android.os.Bundle) {
			switch (navigationEvent) {
				case NavigationEvent.TabHidden:
					if (!isClosedManually) {
						options.successCompletionHandler(redirectionUrl);
						return;
					}

					if (options.onManualClose && typeof options.onManualClose === 'function') {
						options.onManualClose(true);
					}

					break;
			}
		}
	});

	const wv = new co.fitcom.fancywebview.AdvancedWebView(activity, advancedWebViewListener);
	let intentBuilder = wv.getBuilder();
	if (intentBuilder) {
		if (options.toolbarColor) {
			intentBuilder.setToolbarColor(new Color(options.toolbarColor).android);
		}

		if (options.showTitle) {
			intentBuilder.setShowTitle(options.showTitle);
		}

		intentBuilder.addDefaultShareMenuItem(); /// Adds a default share item to the menu.
		intentBuilder.enableUrlBarHiding(); /// Enables the url bar to hide as the user scrolls down on the page.
	}

	handleOpenURL((url: string) => {
		console.log(url);
		if (options.successCompletionHandler && typeof options.successCompletionHandler === 'function' && url) {
			isClosedManually = false;
			redirectionUrl = url;
		}
	});

	wv.loadUrl(options.url);
}

export interface SSOAuthOptions {
	url: string;
	showTitle?: boolean;
	toolbarColor?: string;
	toolbarControlsColor?: string;
	isLogout?: boolean;
	onManualClose?: Function;
	successCompletionHandler?: Function;
}

export function SSOAuthExtractAppUrl(url: string): AppURL {
	return extractAppURL(url);
}
