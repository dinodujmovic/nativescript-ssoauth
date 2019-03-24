<a align="center" href="https://www.npmjs.com/package/nativescript-advanced-webview">
    <h3 align="center">SSOAuth</h3>
</a>
<h4 align="center">
Using <a href="https://developer.chrome.com/multidevice/android/customtabs#whatarethey">Chrome Custom Tabs</a> on Android and <a href="https://developer.apple.com/reference/safariservices/sfsafariviewcontroller?language=objc">SFSafariViewController</a> on iOS to achieve SSO Auth redirection to the application.
</h4>

* This project is a fork of [Advanced WebView Project](https://www.npmjs.com/package/nativescript-advanced-webview)

----------

[Here is a video](https://youtu.be/LVseK_CZp5g) showing off Chrome CustomTabs in NativeScript.

#### Android

[CustomTabs](https://developer.android.com/reference/android/support/customtabs/package-summary.html)

#### iOS

[SFSafariViewController](https://developer.apple.com/reference/safariservices/sfsafariviewcontroller?language=objc)

### Why use this? Because Perf Matters

[Android Comparison](https://developer.chrome.com/multidevice/images/customtab/performance.gif)

### DemowhateverYouLike

| Android                                   | iOS                                             |
| ----------------------------------------- | ----------------------------------------------- |
| ![Android Sample](screens/chromeTabs.gif) | ![iOS Sample](screens/safariViewController.gif) |

## Installation

To install execute

```
tns plugin add nativescript-advanced-webview
```

## Example

#### TypeScript

Initiate the service before the app starts e.g app.ts, main.ts

```typescript
import { init } from 'nativescript-ssoauth';
init();
```

```typescript
import { SSOAuthOpenUrl, SSOAuthOptions } from 'nativescript-ssoauth';
//// or
import * as AdvancedWebView from 'nativescript-ssoauth';

public whateverYouLike() {

    let opts: SSOAuthOptions = {
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        toolbarColor: '#ff4081',
        toolbarControlsColor: '#333', // iOS only
        showTitle: false, // Android only
        onManualClose: closed => {
            console.log(`Manually closed: ${closed}`);
        },
        successCompletionHandler: url => {
            console.log(`Successful URL return: ${url}`);
        }
    };

    SSOAuthOpenUrl(opts);
}
```

#### Javascript

var SSOAuth = require("nativescript-ssoauth");

Initiate the service before the app starts e.g app.ts, main.ts

```javascript
SSOAuth.init();
```

```javascript
exports.openChromTabs = function(args){
    //var gotoUrl = args.view.bindingContext.url;

    var opts = {
            url: args.view.bindingContext.url,
            toolbarColor: '#ff4081',
            toolbarControlsColor: '#333', // iOS only
            showTitle: false, // Android only
            onManualClose: closed => {
                console.log(`Manually closed: ${closed}`);
            },
            successCompletionHandler: url => {
                console.log(`Successful URL return: ${url}`);
            }
    };
   console.log(args.view.bindingContext.url);

   SSOAuth.SSOAuthOpenUrl(opts);
```

#### Important! 
##### Listen for URL change by using CustomAppDelegate and call SSOAuthOpenUrlPostNotification

##### iOS
```typescript
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
```

##### Android
```typescript
```

### API

- SSOAuthOpenUrl(options: SSOAuthOptions)
- SSOAuthExtractAppUrl(url: string) // allows you to easily access returned params
- SSOAuthOpenUrlPostNotification(url: string)

##### SSOAuthOptions Properties

- url: string
- toolbarColor: string
- toolbarControlsColor: string - ** iOS only **
- showTitle: boolean - ** Android only **
- isLogout: boolean
- onManualClose: Function
- successCompletionHandler: Function

##### Demo App

- fork the repo
- cd into `web` directory (recommend: use [http-server](https://www.npmjs.com/package/http-server) to serve files on port 8080)
- cd into the `src` directory
- execute `npm run demo.android` or `npm run demo.ios` (these cmds are in the package.json `scripts` section of the src if you're curious what is executing)
