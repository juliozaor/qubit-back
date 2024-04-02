import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentation/Item/ControllerItem'

Route.group(() => {
  Route.get('/', accion_path + '.getItems')
  Route.get('/:id', accion_path + '.getItem')
  Route.post('/', accion_path + '.setItem')
  Route.put('/', accion_path + '.updateItemAll') //all
  Route.delete('/:id', accion_path + '.deleteItem')
}).prefix('api/v1/items').middleware('authJwt')
