/* eslint-disable @typescript-eslint/naming-convention */
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentation/User/ControllerUser'
const controller = '../../../app/Presentation/Users/ControllerUsers'

Route.group(() => {
  Route.patch('/:identificacion', `${accion_path}.actualizarUsuario`)
  Route.put('/:id', `${controller}.cambiarEstado`)
  Route.post('/registro', `${controller}.guardarUsuario`)
  Route.get('/listar/:pagina?/:limite?', `${controller}.listar`)
  Route.get('/usuario/:usuario', `${controller}.obtenerUsuarioPorUsuario`)
  Route.get('/:id', `${controller}.obtenerUsuarioPorId`)
}).prefix('api/v1/users').middleware('authJwt')
