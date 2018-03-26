import Login from '../components/Login.vue'
import NotFound from '../components/404.vue'
import Home from '../components/Home.vue'
import Main from '../components/nav1/Main.vue'
import Table from '../components/nav1/Table.vue'
import Form from '../components/nav1/Form.vue'
import user from '../components/nav1/user.vue'
import Page4 from '../components/nav2/Page4.vue'
import Page5 from '../components/nav2/Page5.vue'
import Page6 from '../components/nav3/Page6.vue'
import echarts from '../components/charts/echarts.vue'
import Permission from '../components/sys/Permission.vue'
import Menu from '../components/sys/Menu'
import User from '../components/sys/User'
import Bridge from '../components/sys/Bridge'
import Log from '../components/sys/Log'
import DataMon from  '../components/sys/DataMon'
import AccessMon from '../components/sys/AccessMon'

import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/demo/',
  routes: [
    {
      path: '/login',
      component: Login,
      name: '',
      hidden: true
    },
    {
      path: '/',
      component: Home,
      hidden: true,
      name: '',
      children: [
        { path: '/main', component: Main, name: '主页', hidden: true },
        { path: '/404', component: NotFound, name: '404', hidden: true },
      ]
    },
    {
      path: '/demo',
      component: Home,
      name: '系统',
      iconCls: 'el-icon-message',//图标样式class
      children: [

        { path: '/permission', component: Permission, name: '权限' },
        { path: '/menu', component: Menu, name: '菜单' },
        { path: '/user', component: User, name: '用户' },
        {
          path: '',
          component: Bridge,
          name: '监控' ,
          children:[
            { path: '/datamon', component:DataMon , name: '数据监控' },
            { path: '/accessmon', component: AccessMon, name: '访问监控' },
          ]


        },
        { path: '/log', component: Log, name: '日志' },
      ]
    },
    {
      path: '/demo',
      component: Home,
      name: '导航一',
      iconCls: 'el-icon-message',//图标样式class
      children: [

        { path: '/table', component: Table, name: 'Table' },
        { path: '/form', component: Form, name: 'Form' },
        { path: '/user', component: user, name: '列表' },
      ]
    },
    {
      path: '/demo',
      component: Home,
      name: '导航二',
      iconCls: 'fa fa-id-card-o',
      children: [
        { path: '/page4', component: Page4, name: '页面4' },
        { path: '/page5', component: Page5, name: '页面5' }
      ]
    },
    {
      path: '/demo',
      component: Home,
      name: '导航三',
      iconCls: 'fa fa-address-card',
      leaf: true,//只有一个节点
      children: [
        { path: '/page6', component: Page6, name: '页面6' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: 'Charts',
      iconCls: 'fa fa-bar-chart',
      children: [
        { path: '/echarts', component: echarts, name: 'echarts' }
      ]
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
})

