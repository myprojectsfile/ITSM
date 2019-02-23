import axios from 'axios'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from, next) => {
      axios.get('api/sspi')
        .then(
          (result) => {
            console.log(result)
            next()
          },
          (error) => {
            next(error)
          })
    },
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
