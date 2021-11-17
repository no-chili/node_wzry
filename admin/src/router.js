import Vue from "vue";
import Router from "vue-router"
import Main from "./views/Main"
import CategoryEdit from "./views/CategoryEdit"
import CategoryList from "./views/CategoryList"
import ItemsEdit from "./views/ItemsEdit"
import ItemsList from "./views/ItemsList"
import HeroEdit from "./views/HeroEdit"
import HeroList from "./views/HeroList"
import ArticleEdit from "./views/ArticleEdit"
import ArticleList from "./views/ArticleList"
import AdsEdit from "./views/AdsEdit"
import AdsList from "./views/AdsList"
import AdminEdit from "./views/AdminEdit"
import AdminList from "./views/AdminList"
import Login from "./views/Login"




Vue.use(Router)

const routes = [{
        path: '/login',
        component: Login,
        meta: { isPublic: true }
    },
    {
        path: '/',
        component: Main,
        children: [
            { path: '/categories/create', component: CategoryEdit },
            { path: '/categories/edit/:id', component: CategoryEdit, props: true },
            { path: '/categories/list', component: CategoryList },

            { path: '/items/create', component: ItemsEdit },
            { path: '/items/edit/:id', component: ItemsEdit, props: true },
            { path: '/items/list', component: ItemsList },

            { path: '/heroes/create', component: HeroEdit },
            { path: '/heroes/edit/:id', component: HeroEdit, props: true },
            { path: '/heroes/list', component: HeroList },

            { path: '/articles/create', component: ArticleEdit },
            { path: '/articles/edit/:id', component: ArticleEdit, props: true },
            { path: '/articles/list', component: ArticleList },

            { path: '/ads/create', component: AdsEdit },
            { path: '/ads/edit/:id', component: AdsEdit, props: true },
            { path: '/ads/list', component: AdsList },

            { path: '/admins/create', component: AdminEdit },
            { path: '/admins/edit/:id', component: AdminEdit, props: true },
            { path: '/admins/list', component: AdminList },
        ]
    }
]


const router = new Router({
    routes
})

router.beforeEach((to, from, next) => {
    if (!to.meta.isPublic && !localStorage.token) {
        next('/login')
    }
    next()
})

export default router
