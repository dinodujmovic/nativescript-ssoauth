import { SSOAuthOpenUrlPostNotification } from 'nativescript-ssoauth';

export class CustomAppDelegate extends UIResponder implements UIApplicationDelegate {
	public static ObjCProtocols: { prototype: UIApplicationDelegate }[] = [UIApplicationDelegate]; // tslint:disable-line:variable-name

	public applicationOpenURLOptions(
		app: UIApplication,
		url: NSURL,
		options: any
	): boolean {
		const lastArgument = arguments[arguments.length - 1];
		const previousResult = lastArgument !== options ? lastArgument : undefined;

		if (!previousResult) {
			SSOAuthOpenUrlPostNotification(url);
		}

		return true;
	}
}
