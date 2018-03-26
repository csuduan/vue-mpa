import Vue from 'vue'
import Router from 'vue-router'




const login = resolve => require(['../components/login'], resolve)
const admin = resolve => require(['../components/admin'], resolve)
const adminArticle = resolve => require(['../components/adminArticle'], resolve)
const adminChange = resolve => require(['../components/adminChange'], resolve)
const adminArticleList = resolve => require(['../components/adminArticleList'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/blogadmin',
  routes: [
    {
      path: '/',
      name: 'Admin',
      component: admin,
      redirect: { name: 'adminArticle'},
      children: [
        { path: '/admin/adminArticle', component: adminArticle, name: 'adminArticle'},
        { path: '/admin/adminChange', component: adminChange, name: 'adminChange'},
        { path: '/admin/adminArticleList', component: adminArticleList, name: 'adminArticleList'},
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: login,
    }
  ]
})
