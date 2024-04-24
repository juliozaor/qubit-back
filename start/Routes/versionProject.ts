import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentation/VersionProject/ControllerVersionProject'

Route.group(() => {
  Route.get('/', accion_path + '.getVersionProjects')
  Route.get('/:id', accion_path + '.getVersionProject')
  Route.post('/', accion_path + '.setVersionProject')
  Route.get('/project/:id', accion_path + '.getVersionProjectByProject')
  Route.get('/clone/:id', accion_path + '.cloneVersionProject')
  Route.get('/clone-project/:id/:projectId', accion_path + '.cloneVersionProjectByNewProject')
  Route.put('/', accion_path + '.updateVersionProjectAll')
  Route.delete('/:id', accion_path + '.deleteVersionProject')
}).prefix('api/v1/project-version')
