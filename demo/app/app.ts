import * as application from 'tns-core-modules/application';
import { init } from 'nativescript-ssoauth';
import { isAndroid, isIOS } from 'tns-core-modules/platform';
import { ios } from 'tns-core-modules/application';
import { ReplaySubject } from 'rxjs';

let onRouteToURL: ReplaySubject<any>;
if (isIOS) {
	const { CustomAppDelegate, iOSOnRouteToURL } = require('./custom-app-delegate-ios'); // tslint:disable-line
	ios.delegate = CustomAppDelegate;
	onRouteToURL = iOSOnRouteToURL;
} else if (isAndroid) {
	onRouteToURL = require('./extend-activity-android').androidOnRouteToURL; // tslint:disable-line
}

onRouteToURL.subscribe(routeUrlData => {
	console.log(routeUrlData);
});

init();
application.start({ moduleName: 'main-page' });
