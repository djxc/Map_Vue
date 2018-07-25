import Vue from "vue";
import VueRouter from "vue-router";
// 引入组件
import Maps from './components/Maps.vue'
import WebMap from './components/Map.vue'
import home from "./components/home.vue"
import about from "./components/about.vue"
import my3DMap from './components/myMap.vue'
import my2DMap from './components/my2DMap.vue'

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    { path: "/home", component: home },
    { path: "/about", component: about },
    { path: '/', component: Maps },
    { path: '/map/:mapID', component: WebMap },
    { path: '/my3Dmap', component: my3DMap },
    { path: '/my2Dmap', component: my2DMap }
]

var router =  new VueRouter({
  	mode: 'history',	//使用history可以使url中不显示‘#’，会好看些
    routes
})
export default router;
