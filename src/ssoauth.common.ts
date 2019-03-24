export interface AppURL extends Object {
	path: string;
	params: Map<string, string>;
}

export function extractAppURL(urlParam: any): AppURL {
	if (!!urlParam) {
		// @ts-ignore
		let url = urlParam.toString(),
			params = new Map<string, string>(), // tslint ignore:line
			urlWithPath = url.indexOf('//') < url.length - 2,
			urlWithParams = url.indexOf('?') !== -1,
			path = urlWithPath ? url.substring(url.indexOf('//') + 2, urlWithParams ? url.indexOf('?') : url.length) : null,
			parameters = url.substring(url.indexOf('?') + 1).split('&');
		// create JSON object
		if (urlWithParams) {
			for (let i = 0, len = parameters.length; i < len; i++) {
				let paramData = parameters[i].split('=');
				params.set(paramData[0], paramData[1] ? paramData[1] : null);
			}
		}
		return {
			params: params,
			path: path,
			toString: () => url
		};
	} else {
		return null;
	}
}
