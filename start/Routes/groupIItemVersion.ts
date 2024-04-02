import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentation/GroupIItemVersion/ControllerGroupIItemVersion'

Route.group(() => {
  Route.get('/', accion_path + '.getGroupIItemVersions')
  Route.get('/:id', accion_path + '.getGroupIItemVersion')
  Route.get('/group/:id', accion_path + '.getGroupIItemVersionByGroup')
  Route.get('/clone/:idOld/:idNew', accion_path + '.cloneGroupIItemVersionByGroup')
  Route.get('/add/:projectId/:groupId', accion_path + '.addGroupIItemVersionByGroup')
  Route.post('/', accion_path + '.setGroupIItemVersion')
  Route.put('/', accion_path + '.updateGroupIItemVersionAll') 
  Route.delete('/:id', accion_path + '.deleteGroupIItemVersion')
}).prefix('api/v1/items_i_group_version')
