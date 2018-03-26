import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/views/Index'
// import Blog from '@/views/Blog'
// import About from '@/views/About'
// import Article from '@/views/Article'
// import Messages from '@/views/Messages'
// import admin from '@/admin/admin'
// import adminArticle from '@/admin/adminArticle'
// import change from '@/admin/change'
// import adminArticleList from '@/admin/adminArticleList'
import login from '@/views/blog/login'

const Blog = resolve => require(['@/views/blog/Blog'], resolve)
const About = resolve => require(['@/views/blog/About'], resolve)
const Article = resolve => require(['@/views/blog/Article'], resolve)
const Messages = resolve => require(['@/views/blog/messages'], resolve)
const Test = resolve => require(['@/views/blog/test'], resolve)

const admin = resolve => require(['@/views/blog/admin/admin'], resolve)
const adminArticle = resolve => require(['@/views/blog/admin/adminArticle'], resolve)
const adminChange = resolve => require(['@/views/blog/admin/adminChange'], resolve)
const adminArticleList = resolve => require(['@/views/blog/admin/adminArticleList'], resolve)

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
        },
        {
            path: '/admin',
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
