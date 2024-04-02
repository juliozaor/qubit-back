
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentation/Email/ControladorEmail'

Route.group(() => {
  Route.post('/envio-email', accion_path + '.EnviarEmail')
}).prefix('api/v1')
