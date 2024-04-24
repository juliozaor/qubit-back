import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentation/GroupIItem/ControllerGroupIItem'

Route.group(() => {
  Route.get('/', accion_path + '.getGroupIItems')
  Route.get('/:id', accion_path + '.getGroupIItem')
  Route.get('/group/:id', accion_path + '.getGroupIItemByGroup')
  Route.get('/clone/:idOld/:idNew', accion_path + '.cloneGroupIItemByGroup')
  Route.post('/', accion_path + '.setGroupIItem')
  Route.put('/', accion_path + '.updateGroupIItemAll') 
  Route.put('/group/:id', accion_path + '.updateGroupIItemByGroup')
  Route.delete('/:id', accion_path + '.deleteGroupIItem')
}).prefix('api/v1/items_i_group')
