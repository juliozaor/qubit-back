import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentation/Master/ControllerMaster'

Route.group(() => {
  Route.get('/status', accion_path + '.getStatus')
  Route.get('/typeApplication', accion_path + '.getTypeApplications')
  Route.get('/typeDevice', accion_path + '.getTypeDevices')
  Route.get('/typeItem', accion_path + '.getTypeItems')
  Route.get('/typeProject', accion_path + '.getTypeProjects')
  Route.get('/typeUnit', accion_path + '.getTypeUnits')
  Route.get('/projectStatus', accion_path + '.getprojectStatus')
  Route.get('/categories', accion_path + '.getCategories')
}).prefix('api/v1/masters').middleware('authJwt')