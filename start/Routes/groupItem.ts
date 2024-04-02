import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentation/GroupItem/ControllerGroupItem'

Route.group(() => {
  Route.get('/', accion_path + '.getGroupItems')
  Route.get('/:id', accion_path + '.getGroupItem')
  Route.get('/clone/:id', accion_path + '.cloneGroupItem')
  Route.post('/', accion_path + '.setGroupItem')
  Route.put('/', accion_path + '.updateGroupItemAll') //all
}).prefix('api/v1/group-items')
