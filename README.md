<a align="center" href="https://www.npmjs.com/package/nativescript-ssoauth">
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
| ![Android Sample](screens/_chromeTabs.gif) | ![iOS Sample](screens/_safariViewController.gif) |

## Installation

To install execute (Coming soon...)

```
tns plugin add nativescript-ssoauth
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

public whateverYouLike() {

    let opts: SSOAuthOptions = {
        url: 'https://login.de?redirectionUri=com.demoapp://',
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

How to use:
---------------

### iOS

1. Add your application CFBundleURLSchemes name.
    ###### Info.plist
    ```
    <key>CFBundleURLTypes</key>
    <array>
      <dict>
        <key>CFBundleURLSchemes</key>
        <array>
          <string>com.demoapp</string>
        </array>
        <key>CFBundleURLName</key>
        <string>com.demoapp</string>
        <key>CFBundleTypeRole</key>
        <string>Viewer</string>
      </dict>
    </array>
    ```
2. Create CustomAppDelegate class. Override applicationOpenURLOptions method to catch redirectionUrl and call SSOAuthOpenUrlPostNotification(redirectionUrl);

    ###### custom-app-delegate-ios.ts
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

    ###### app.ts
    ```typescript
    import { ios } from 'tns-core-modules/application';
    import { isIOS } from 'tns-core-modules/platform';
    
    if (isIOS) {
        const { CustomAppDelegate } = require('./custom-app-delegate-ios'); // tslint:disable-line
        ios.delegate = CustomAppDelegate;
    }
    ```

------------------------------------------------------------

### Android

1. To listen for application redirection in Android. Specify your schema name by adding intent-filter (shown in the example)

    ###### AndroidManifest.xml

    ```xml
    <activity android:name="com.ActivityName">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="com.demoapp" />
    </intent-filter>
    </activity>
    ```
2. Extend Android activity (example: demo/app/activity-extend-android.ts) and onCreate pass intent by calling SSOAuthOpenUrlBroadcastRedirectionURL(this.intent);

    ###### activity-extend-android.ts

    ```
    import {setActivityCallbacks, AndroidActivityCallbacks} from "tns-core-modules/ui/frame";
    import { SSOAuthOpenUrlBroadcastRedirectionURL } from 'nativescript-ssoauth';

    @JavaProxy("com.tns.NativeScriptActivity")
    class Activity extends android.support.v7.app.AppCompatActivity {
        public isNativeScriptActivity;

	private _callbacks: AndroidActivityCallbacks;
	
    public onCreate(savedInstanceState: android.os.Bundle): void {
        // Set the isNativeScriptActivity in onCreate (as done in the original NativeScript activity code)
        // The JS constructor might not be called because the activity is created from Android.
        this.isNativeScriptActivity = true;
        if (!this._callbacks) {
            setActivityCallbacks(this);
        }

        this._callbacks.onCreate(this, savedInstanceState, super.onCreate);

        let intent: android.content.Intent = this.getIntent();
        SSOAuthOpenUrlBroadcastRedirectionURL(intent);
        }
    }
    ```
    
    ###### app.ts
    ```typescript
    import { isAndroid } from 'tns-core-modules/platform';
    
    if (isAndroid) {
        require('./activity-extend-android')
    }
    ```
---------------------

### API

- SSOAuthOpenUrl(options: SSOAuthOptions) // open URL
- SSOAuthExtractAppUrl(url: string) // extract returned URL and it's parameters
- SSOAuthOpenUrlPostNotification(url: string) // iOS only - broadcast redirection URL to SSOAuth
- SSOAuthOpenUrlBroadcastRedirectionURL(intent: android.content.Intent) // Android only - broadcast intent to SSOAuth

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
