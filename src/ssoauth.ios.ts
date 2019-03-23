import { Color } from 'tns-core-modules/color';
import * as utils from 'tns-core-modules/utils/utils';

const kCloseSafariViewControllerNotification = 'kCloseSafariViewControllerNotification';

class SFSafariViewControllerDelegateImpl extends NSObject implements SFSafariViewControllerDelegate {
	public static ObjCProtocols = [SFSafariViewControllerDelegate];

	private _owner: WeakRef<any>;

	public static initWithOwnerCallback(owner: WeakRef<any>): SFSafariViewControllerDelegateImpl {
		let delegate = <SFSafariViewControllerDelegateImpl>SFSafariViewControllerDelegateImpl.new();
		delegate._owner = owner;
		return delegate;
	}

	safariViewControllerDidCompleteInitialLoad(controller: SFSafariViewController, didLoadSuccessfully: boolean): void {
		console.log('Delegate, safariViewControllerDidCompleteInitialLoad: ' + didLoadSuccessfully);
	}

	safariViewControllerDidFinish(controller: SFSafariViewController): void {
		console.log(`Delegate, safariViewControllerDidFinish`);
	}
}

class AuthSFSafariViewController extends SFSafariViewController {
	private static _observer: any; // tslint:disable-line
	private static _options: SSOAuthOptions;
	private static _onClose: Function;
	private static _successCompletionHandler: Function;

	public static initWithOptions(options): any {
		const SFViewController: SFSafariViewController = AuthSFSafariViewController.alloc().initWithURL(
			NSURL.URLWithString(options.url)
		);
		AuthSFSafariViewController._options = options;
		AuthSFSafariViewController._onClose = options.onClose ? options.onClose : null;
		AuthSFSafariViewController._successCompletionHandler = options.successCompletionHandler
			? options.successCompletionHandler
			: null;
		return SFViewController;
	}

	public loginSafari(notification: NSNotification): void {
		const url: string = notification.object;

		if (url.startsWith(AuthSFSafariViewController._options.callbackURLScheme)) {
			AuthSFSafariViewController._successCompletionHandler(url);
			const sharedApp = utils.ios.getter(UIApplication, UIApplication.sharedApplication);
			sharedApp.keyWindow.rootViewController.dismissViewControllerAnimatedCompletion(true, null);
			utils.ios
				.getter(NSNotificationCenter, NSNotificationCenter.defaultCenter)
				.removeObserver(AuthSFSafariViewController._observer);
			utils.GC();
		}
	}

	// Override
	public viewDidAppear(animated: boolean): void {
		super.viewDidAppear(animated);
		console.log(`View did appear !`);

		if (AuthSFSafariViewController._options.isLogout) {
			const sharedApp = utils.ios.getter(UIApplication, UIApplication.sharedApplication);
			sharedApp.keyWindow.rootViewController.dismissViewControllerAnimatedCompletion(true, null);
			AuthSFSafariViewController._successCompletionHandler(null);
		}

		if (
			AuthSFSafariViewController._successCompletionHandler &&
			typeof AuthSFSafariViewController._successCompletionHandler === 'function'
		) {
			AuthSFSafariViewController._observer = utils.ios
				.getter(NSNotificationCenter, NSNotificationCenter.defaultCenter)
				.addObserverForNameObjectQueueUsingBlock(kCloseSafariViewControllerNotification, null, null, this.loginSafari);
		}
	}

	public viewDidDisappear(): void {
		super.viewDidDisappear(true);
		console.log(`View did disappear !`);

		if (AuthSFSafariViewController._onClose && typeof AuthSFSafariViewController._onClose === 'function') {
			AuthSFSafariViewController._onClose(true);
		}

		// Remove observer
		if (AuthSFSafariViewController._observer) {
			utils.ios
				.getter(NSNotificationCenter, NSNotificationCenter.defaultCenter)
				.removeObserver(AuthSFSafariViewController._observer);
		}
	}
}

export function init() {}

export function SSOAuthOpenUrl(options: SSOAuthOptions): void {
	if (!options.url) {
		throw new Error('No url set in the Advanced WebView Options object.');
	}

	const sfc: any = AuthSFSafariViewController.initWithOptions(options); // tslint:disable-line

	if (options.toolbarColor) {
		sfc.preferredBarTintColor = new Color(options.toolbarColor).ios;
	}

	if (options.toolbarControlsColor) {
		sfc.preferredControlTintColor = new Color(options.toolbarControlsColor).ios;
	}

	sfc.delegate = SFSafariViewControllerDelegateImpl.initWithOwnerCallback(new WeakRef({}));

	let app = utils.ios.getter(UIApplication, UIApplication.sharedApplication);

	const animated = true;
	const completionHandler = null;
	app.keyWindow.rootViewController.presentViewControllerAnimatedCompletion(sfc, animated, completionHandler);
}

export function SSOAuthOpenUrlPostNotification(url: NSURL) {
	utils.ios
		.getter(NSNotificationCenter, NSNotificationCenter.defaultCenter)
		.postNotificationNameObject(kCloseSafariViewControllerNotification, url.absoluteString);
}

export interface SSOAuthOptions {
	url: string;
	showTitle?: boolean;
	toolbarColor?: string;
	toolbarControlsColor?: string;
	callbackURLScheme: string;
	isLogout?: boolean;
	onClose?: Function;
	successCompletionHandler?: Function;
}
