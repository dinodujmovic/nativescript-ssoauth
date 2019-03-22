import { Observable } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { isIOS } from 'tns-core-modules/platform';
import { openAdvancedUrl, SSOAuthOptions } from 'nativescript-ssoauth';

export class HelloWorldModel extends Observable {
	public openUrlButtonText: string;

	constructor(page: Page) {
		super();

		if (isIOS) {
			this.openUrlButtonText = 'Open Safari View Controller';
		} else {
			this.openUrlButtonText = 'Open Chrome Custom Tabs';
		}
	}

	public onTap() {
		try {
			let opt: SSOAuthOptions = {
				url: 'http://127.0.0.1:8080/',
				showTitle: true,
				toolbarColor: '#336699',
				toolbarControlsColor: '#333',
				callbackURLScheme: 'com.demoapp://',
				onClose: closed => {
					console.log(`Manually closed: ${closed}`);
				},
				successCompletionHandler: url => {
					console.log(`Successful URL return: ${url}`);
				}
			};

			openAdvancedUrl(opt);
		} catch (error) {
			console.log(error);
		}
	}
}
