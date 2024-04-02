import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentation/Project/ControllerProject'

Route.group(() => {
  Route.get('/', accion_path + '.getProjects')
  Route.get('/:id', accion_path + '.getProject')
  Route.post('/', accion_path + '.setProject')
  Route.put('/', accion_path + '.updateProjectAll') 
  Route.delete('/:id', accion_path + '.deleteProject')
}).prefix('api/v1/project')
