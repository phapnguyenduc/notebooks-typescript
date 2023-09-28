import { Router } from 'express'
import RouteGroup from 'express-route-grouping'
import UserController from '~/controllers/users.controllers'
import NoteController from '~/controllers/notes.controllers'

const root = new RouteGroup('/', Router())

const registerRoutes = (app: any) => {
  root.group('api', (route) => {
    route.group('/private', (router) => {
      router.get('/notes/:page', NoteController.notePaginate)
    })

    route.post('/user/add', UserController.create)
  })
  app.use('/', root.export())
}

export default registerRoutes
