
        var Vue = require('vue');
        var App = require('/Users/sun/workspace/vueify/src/component/my/b.vue');
        Vue.config.devtools = true;
        new Vue({
            el: '#app',
            render: function (createElement) {
                return createElement(App)
            }
        })