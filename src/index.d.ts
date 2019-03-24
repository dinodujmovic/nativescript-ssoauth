/**
 * Open the Advanced WebView - Safari on iOS and Chrome on Android.
 * If the browser is not installed on the device, it should fall back to a webview.
 * @param {SSOAuthOptions}
 */
export function SSOAuthOpenUrl(options: SSOAuthOptions): void;

export function init(): void;

export interface AppURL extends Object {
	path: string;
	params: Map<string, string>;
}

export function SSOAuthExtractAppUrl(url: string): AppURL;

export interface SSOAuthOptions {
	/**
	 * The url of the site to open.
	 */
	url: string;

	/**
	 * The color of the toolbar.
	 */
	toolbarColor?: string;

	/**
	 * Set true to show the site title. *** ANDROID ONLY ***
	 */
	showTitle?: boolean;

	/**
	 * The color of the toolbar controls. *** iOS ONLY ***
	 */
	toolbarControlsColor?: string;
	/**
	 * Is logout URL
	 */
	isLogout?: boolean;
	/**
	 * Callback for when the webview is closed
	 */
	onManualClose?: Function;

	/**
	 * Callback for when the webview is logged/redirected
	 */
	successCompletionHandler?: Function;
}

export function SSOAuthOpenUrlPostNotification(url: NSURL): void;
