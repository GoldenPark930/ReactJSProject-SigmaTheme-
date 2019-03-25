import Config from 'react-native-config';

const publicKey = Config.PLAID_PUBLIC_KEY;
const env = Config.PLAID_ENV;
const product = Config.PLAID_PRODUCT;
const webviewUrl = Config.PLAID_WEBVIEW_URL;

export const config = { publicKey, env, product, webviewUrl };
export const PlaidWebViewSourceURL = `${webviewUrl}?key=${publicKey}&apiVersion=v2&env=${env}&product=${product}&isWebView=true&isMobile=true`;
