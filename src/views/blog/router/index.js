import Vue from 'vue'
import Router from 'vue-router'


const Blog = resolve => require(['../components/Blog'], resolve)
const About = resolve => require(['../components/About'], resolve)
const Article = resolve => require(['../components/Article'], resolve)
const Messages = resolve => require(['../components/messages'], resolve)
const Test = resolve => require(['../components/test'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/blog',
  routes: [
    {
      path: '/',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/article',
      name: 'Article',
      component: Article
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages
    }
  ]
})
