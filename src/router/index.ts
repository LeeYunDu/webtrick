import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import layout from '@/views/layout/index.vue'
import store from '@/store'

/**
 * 扫描文件,加载文章路由
 */
import articlesComponents from '@/views'

function initRouter() {
  const routers:any = []
  for (const key in articlesComponents) {
    if (Object.prototype.hasOwnProperty.call(articlesComponents, key)) {
      const element = articlesComponents[key]
      // 拼接路由
      const modules:RouteRecordRaw = {
        path: `/${key}`,
        name: `${element.title}`,
        component: layout,
        meta: { sort: element.sort },
        children: []
      }

      if (element.children.length > 0) {
        const childrens:any = []
        element.children.map(component => {
          // 拼接子路由

          try {
            // const filePath = component.filePath.replace('src/views/articles/', 'views/articles/')
            const childrenRouter = {
              path: `${component.fileName}`,
              name: `${component.name}`,
              component: component.components,
              meta: { sort: component.sort }
            }
            childrens.push(childrenRouter)
          } catch (error) {
            console.log('error: ', error)
          }
        })
        modules.children = childrens
      }
      routers.push(modules)
    }
  }

  // 文章排序
  routers.sort((m, n) => {
    return m.meta.sort - n.meta.sort
  })
  const result = routes.concat(routers)
  result.map(e => {
    router.addRoute(e)
  })
  // 保存文章路由
  store.dispatch('router/setRouter', routers)
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    children: []
  },
  {
    path: '/study',
    name: 'study',
    component: () => import('@/views/study/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

initRouter()

export default router
