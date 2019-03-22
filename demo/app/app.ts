import * as application from 'tns-core-modules/application';
import { init } from 'nativescript-ssoauth';
init();
application.start({ moduleName: 'main-page' });
