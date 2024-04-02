import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentation/ConceptDraw/ControllerConceptDraw'

Route.group(() => {
  Route.get('/', accion_path + '.getConceptDraws')
  Route.get('/:id', accion_path + '.getConceptDraw')
  Route.post('/', accion_path + '.setConceptDraw')
  Route.put('/', accion_path + '.updateConceptDrawAll') 
  Route.delete('/', accion_path + '.deleteConceptDraw')
}).prefix('api/v1/concept-draw')
