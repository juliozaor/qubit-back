import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentation/Rol/ControllerRol'

Route.group(() => {
  Route.get('', accion_path + '.list')
}).prefix('api/v1/rol').middleware(['authJwt'])//middleware(['authJwt', 'permiso:001,001']) //permiso:{moduloId},{funcionalidadId}
