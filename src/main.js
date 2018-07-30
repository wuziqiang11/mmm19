import Vue from 'vue'
import App from './App.vue'
// 引入路由模板
import VueRouter from 'vue-router'
// 引入index组件
import index from './components/index.vue'
// 引入goods组件
import goodsInfo from './components/goodsInfo.vue'

import buycar from './components/buycar.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入懒加载
import VueLazyload from 'vue-lazyload'
// 导入moment 模块 时间
import moment from 'moment'
// 导入axios模块
import axios from 'axios';
// 引入vuex模块
import Vuex from 'vuex';
// 引入iview模块
import iView from 'iview';
import 'iview/dist/styles/iview.css';

axios.defaults.baseURL = 'http://47.106.148.205:8899';
// 共用的原型
Vue.prototype.axios = axios;
// 导入路径模板
// import path from 'path'
// 使用路由中间件
Vue.use(VueRouter)
// ui中间件
Vue.use(ElementUI);
// 懒加载中间件
Vue.use(VueLazyload, {
    loading: require('./assets/statics/site/img/01.gif')
})
// vuex中间键
Vue.use(Vuex);
// 注册路由规则
const router = new VueRouter({
    routes: [{
            path: '/',
            component: index
        },
        {
            path: '/index',
            component: index
        },
        {
            path: '/goodsInfo/:id',
            component: goodsInfo
        },
        {
            path: '/buycar',
            component: buycar
        }
    ]
})
//注册全局过滤器 
Vue.filter('cutTime',function (value) {
    return moment(value).format('YYYY年MM月DD日')
})
// 导入iview中间键
Vue.use(iView);
// 引入css
import './assets/statics/site/css/style.css'

Vue.config.productionTip = false
// 判断数据是否存在
let buylist = JSON.parse(window.localStorage.getItem('buylist'))||{}; 
// 实例化一个vuex仓库
const store = new Vuex.Store({
    state: {
    buylist
    },
    getters:{
        totalCount(state){
            let num = 0;
            for (const key in state.buylist) {
                num+=parseInt(state.buylist[key]);
            }
            return num;
        }
    },
    mutations: {
     buyGood(state,info){
         if(state.buylist[info.goodId]){
            //  解决字符串累加问题
             let lodNum = parseInt(state.buylist[info.goodId])
             lodNum  +=parseInt( info.goodNum);
            //  重新赋值
             state.buylist[info.goodId] = lodNum;
         }else{
            //  state.buylist[info.goodId]=info.goodNum;
            Vue.set(state.buylist, info.goodId, parseInt(info.goodNum) );
         }
     }
    }
  })

new Vue({
    el: '#app',
    // 挂载vue
    router,
    render: h => h(App),
    //挂载仓库
    store 
})
// 注册逻辑
// 页面刷新关闭
window.onbeforeunload = function () {
    window.localStorage.setItem('buylist',JSON.stringify(store.state.buylist));
}

