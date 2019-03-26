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

		this._handleIntent();
	}

	public onSaveInstanceState(outState: android.os.Bundle): void {
		this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState);
	}

	public onStart(): void {
		this._callbacks.onStart(this, super.onStart);
	}

	public onStop(): void {
		this._callbacks.onStop(this, super.onStop);
	}

	public onDestroy(): void {
		this._callbacks.onDestroy(this, super.onDestroy);
	}

	public onBackPressed(): void {
		this._callbacks.onBackPressed(this, super.onBackPressed);
	}

	public onRequestPermissionsResult(requestCode: number, permissions: Array<string>, grantResults: Array<number>): void {
		this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined /*TODO: Enable if needed*/);
	}

	public onActivityResult(requestCode: number, resultCode: number, data: android.content.Intent): void {
		this._callbacks.onActivityResult(this, requestCode, resultCode, data, super.onActivityResult);
	}

	private _handleIntent() {
		let intent: android.content.Intent = this.getIntent();
		SSOAuthOpenUrlBroadcastRedirectionURL(intent);
	}
}
