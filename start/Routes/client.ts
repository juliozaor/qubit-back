import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentation/Client/ControllerClient'

Route.group(() => {
  Route.get('/', accion_path + '.getClients')
  Route.get('/:id', accion_path + '.getClient')
  Route.post('/', accion_path + '.setClient')
  Route.put('/', accion_path + '.updateClientAll') 
  Route.delete('/:id', accion_path + '.deleteClient')
}).prefix('api/v1/client')
