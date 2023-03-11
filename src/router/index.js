import { createRouter, createWebHistory} from 'vue-router'
import Asset from '../view/asset/AssetPage'
import Test from '../view/TestPage.vue'

const routes = [
    { path: '/asset', component: Asset },
    { path: '/overview', component: Test },
]

const router = createRouter({
    history: createWebHistory(process.env.Base_URL),
    routes,
})

export default router