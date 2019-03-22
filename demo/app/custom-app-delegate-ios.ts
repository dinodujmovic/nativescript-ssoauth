import { ReplaySubject } from 'rxjs';
import * as utils from 'tns-core-modules/utils/utils';

export const iOSOnRouteToURL: ReplaySubject<any> = new ReplaySubject<any>();

export class CustomAppDelegate extends UIResponder implements UIApplicationDelegate {
	public static ObjCProtocols: { prototype: UIApplicationDelegate }[] = [UIApplicationDelegate]; // tslint:disable-line:variable-name

	public applicationOpenURLOptions(
		app: UIApplication,
		url: NSURL
	): boolean {
		// Will catch redirection to CFBundleURLName
		utils.ios.getter(NSNotificationCenter, NSNotificationCenter.defaultCenter)
			.postNotificationNameObject('kCloseSafariViewControllerNotification', url.absoluteString);

		this.handleRouting(url);
		return true;
	}

	private handleRouting(url: NSURL): void {
		iOSOnRouteToURL.next({ url: url.absoluteString });
	}
}
