import { ReplaySubject } from 'rxjs';
import { SSOAuthOpenUrlPostNotification } from 'nativescript-ssoauth';

export const iOSOnRouteToURL: ReplaySubject<any> = new ReplaySubject<any>();

export class CustomAppDelegate extends UIResponder implements UIApplicationDelegate {
	public static ObjCProtocols: { prototype: UIApplicationDelegate }[] = [UIApplicationDelegate]; // tslint:disable-line:variable-name

	public applicationOpenURLOptions(
		app: UIApplication,
		url: NSURL
	): boolean {
		// Will catch redirection to CFBundleURLName
		SSOAuthOpenUrlPostNotification(url);

		this.handleRouting(url);
		return true;
	}

	private handleRouting(url: NSURL): void {
		iOSOnRouteToURL.next({ url: url.absoluteString });
	}
}
