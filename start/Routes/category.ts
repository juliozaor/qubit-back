import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentation/Category/ControllerCategory'

Route.group(() => {
  Route.get('/', accion_path + '.getCategories')
  Route.get('/:id', accion_path + '.getCategory')
  Route.post('/', accion_path + '.setCategory')
  Route.put('/', accion_path + '.updateCategoryAll') 
  Route.delete('/:id', accion_path + '.deleteCategory')
}).prefix('api/v1/category')
