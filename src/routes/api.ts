import { Router } from 'express'
import RouteGroup from 'express-route-grouping'
import UserController from '~/controllers/users.controllers'
import NoteController from '~/controllers/notes.controllers'
import Auth from '~/middlewares/auth.middlewares'
import TagController from '~/controllers/tags.controllers'
import UserValidate from '~/validates/users.validates'
import NoteValidate from '~/validates/notes.validates'

const root = new RouteGroup('/', Router())

const registerRoutes = (app: any) => {
  root.group('api', (route) => {
    route.group('/private', (router) => {
      router.get('/notes/:page', [Auth.isAuth], NoteController.notePaginate)
      router.get('/tags', [Auth.isAuth], TagController.get)
      router.post('/note/save', [Auth.isAuth], NoteValidate.validate(), NoteController.save)
      router.delete('/note/delete/:id', [Auth.isAuth], NoteController.delete)
    })

    route.post('/user/add', UserValidate.validate(), UserController.createOrLogin)
  })
  app.use('/', root.export())
}

export default registerRoutes
