<a align="center" href="https://www.npmjs.com/package/nativescript-advanced-webview">
    <h3 align="center">NativeScript Advanced Webview</h3>
</a>
<h4 align="center">
An advanced webview using <a href="https://developer.chrome.com/multidevice/android/customtabs#whatarethey">Chrome Custom Tabs</a> on Android and <a href="https://developer.apple.com/reference/safariservices/sfsafariviewcontroller?language=objc">SFSafariViewController</a> on iOS.
</h4>

<p align="center">
    <a href="https://www.npmjs.com/package/nativescript-advanced-webview">
        <img src="https://img.shields.io/npm/v/nativescript-advanced-webview.svg" alt="npm">
    </a>
    <a href="https://www.npmjs.com/package/nativescript-advanced-webview">
        <img src="https://img.shields.io/npm/dt/nativescript-advanced-webview.svg?label=npm%20downloads" alt="npm">
    </a>
    <a href="https://github.com/bradmartin/nativescript-advanced-webview/stargazers">
        <img src="https://img.shields.io/github/stars/bradmartin/nativescript-advanced-webview.svg" alt="stars">
    </a>
     <a href="https://github.com/bradmartin/nativescript-advanced-webview/network">
        <img src="https://img.shields.io/github/forks/bradmartin/nativescript-advanced-webview.svg" alt="forks">
    </a>
    <a href="https://github.com/bradmartin/nativescript-advanced-webview/blob/master/LICENSE.md">
        <img src="https://img.shields.io/github/license/bradmartin/nativescript-advanced-webview.svg" alt="license">
    </a>
</p>

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
import { openAdvancedUrl, SSOAuthOptions } from 'nativescript-ssoauth';
//// or
import * as AdvancedWebView from 'nativescript-ssoauth';

public whateverYouLike() {

    let opts: SSOAuthOptions = {
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        toolbarColor: '#ff4081',
        toolbarControlsColor: '#333', // iOS only
        showTitle: false, // Android only
        callbackURLScheme: 'com.demoapp://',
        onClose: closed => {
            console.log(`Manually closed: ${closed}`);
        },
        successCompletionHandler: url => {
            console.log(`Successful URL return: ${url}`);
        }
    };

    openAdvancedUrl(opts);
}
```

#### Javascript

var AdvancedWebView = require("nativescript-advanced-webview");

Initiate the service before the app starts e.g app.ts, main.ts

```javascript
AdvancedWebView.init();
```

```javascript
exports.openChromTabs = function(args){
    //var gotoUrl = args.view.bindingContext.url;

    var opts = {
            url: args.view.bindingContext.url,
            toolbarColor: '#ff4081',
            toolbarControlsColor: '#333', // iOS only
            showTitle: false, // Android only
            callbackURLScheme: 'com.demoapp://',
            onClose: closed => {
                    console.log(`Manually closed: ${closed}`);
                },
                successCompletionHandler: url => {
                    console.log(`Successful URL return: ${url}`);
                }
    };
   console.log(args.view.bindingContext.url);

   AdvancedWebView.openAdvancedUrl(opts);
```

### API

- openAdvancedUrl(options: SSOAuthOptions)

##### SSOAuthOptions Properties

- url: string
- toolbarColor: string
- toolbarControlsColor: string - ** iOS only **
- showTitle: boolean - ** Android only **
- callbackURLScheme: string
- isLogout: boolean
- onClose: Function
- successCompletionHandler: Function

##### Demo App

- fork the repo
- cd into `web` directory (recommend: use [http-server](https://www.npmjs.com/package/http-server) to server web files on port 8080)
- cd into the `src` directory
- execute `npm run demo.android` or `npm run demo.ios` (these cmds are in the package.json `scripts` section of the src if you're curious what is executing)
