import Vue from "nativescript-vue";
import App from "./components/App";
// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false;
Vue.registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView)
// import * as platform from 'tns-core-modules/platform'

// if (platform.isIOS) {
//     GMSServices.provideAPIKey("AIzaSyDXzLk7b0Tm0koULT84E7D9tkLkH3AnuyI");
// }

// Vue.registerElement('MapView', ()=> require('nativescript-google-maps-sdk').MapView)

new Vue({
    render: h => h(App)
}).$start();
