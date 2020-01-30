//import Vue from 'vue';
//import App from  './component/a.vue';

var Vue = require('vue');
var App = require('./a.vue');
new Vue({
    el: '#app',
    render: function (h) {
		return h(App)
	}
})