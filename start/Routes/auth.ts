import Route from '@ioc:Adonis/Core/Route'
const controlador = '../../../app/Presentation/Auth/ControllerAuth'

Route.group(() => {
  Route.post('/login', controlador+'.login')
  Route.post('/reset-password', controlador+'.resetPassword')
}).prefix('/api/v1/auth')
