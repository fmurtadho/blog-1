import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path : 'article/:articleId',
          name : 'FullArticleCard',
          component: () => import(/* webpackChunkName: "about" */ './components/FullArticleCard.vue')
        },
        {
          path : 'post',
          name : 'PostArticle',
          component: () => import(/* webpackChunkName: "about" */ './components/CreateArticleCard.vue')
        },
        {
          path : 'myarticle',
          name : 'MyArticle',
          component: () => import(/* webpackChunkName: "about" */ './components/MyArticle.vue')
        },
        {
          path : '/edit/:articleId',
          name : 'EditArticle',
          component: () => import(/* webpackChunkName: "about" */ './components/EditArticleCard.vue')
        },
        {
          path : '/myprofile',
          name : 'MyProfile',
          component: () => import(/* webpackChunkName: "about" */ './components/MyProfile.vue')
        }
      ]
    },
    // {
    //   path: '/edit/:articleId',
    //   name: 'editarticle',
    //   component: () => import(/* webpackChunkName: "about" */ './views/EditArticle.vue')
    // },
    {
      path : '/author/:authorId',
      name : 'AboutAuthor',
      component: () => import(/* webpackChunkName: "about" */ './views/Author.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/myprofile',
      name: 'myprofile',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/MyProfile.vue')
    },
  ]
})
