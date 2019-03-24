import { Observable } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import { isIOS } from 'tns-core-modules/platform';
import { SSOAuthOpenUrl, SSOAuthOptions, SSOAuthExtractAppUrl } from 'nativescript-ssoauth';

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
				onManualClose: closed => {
					console.log(`Manually closed ! ${closed}`);
				},
				successCompletionHandler: url => {
					console.log(`=========================`);
					console.log(`Full URL:`);
					console.log(SSOAuthExtractAppUrl(url));
					console.log(`---- Path: ----`);
					console.log(SSOAuthExtractAppUrl(url).path);
					console.log(`---- Params: ----`);
					console.log(`Param1: ${SSOAuthExtractAppUrl(url).params.get('param1')}`);
					console.log(`Param2: ${SSOAuthExtractAppUrl(url).params.get('param2')}`);
					console.log(`=========================`);

					dialogs.alert({
						title: `Redirection URL`,
						message: url,
						okButtonText: 'OK'
					})
				}
			};

			SSOAuthOpenUrl(opt);
		} catch (error) {
			console.log(error);
		}
	}
}
