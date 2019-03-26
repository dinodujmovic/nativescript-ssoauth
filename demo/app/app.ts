import * as application from 'tns-core-modules/application';
import { init } from 'nativescript-ssoauth';
import { isIOS } from 'tns-core-modules/platform';
import { ios } from 'tns-core-modules/application';

if (isIOS) {
	const { CustomAppDelegate } = require('./custom-app-delegate-ios'); // tslint:disable-line
	ios.delegate = CustomAppDelegate;
} else {
	require('./activity-extend-android');
}

init();
application.start({ moduleName: 'main-page' });
