import Vue from "nativescript-vue";
import App from "./components/App";
// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false;
Vue.registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView)
if (application.ios) {
    GMSServices.provideAPIKey("AIzaSyDXzLk7b0Tm0koULT84E7D9tkLkH3AnuyI");
}

new Vue({
    render: h => h(App)
}).$start();
