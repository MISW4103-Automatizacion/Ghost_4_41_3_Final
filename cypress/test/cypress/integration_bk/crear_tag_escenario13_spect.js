describe('Escenario 13 Ingresar a la aplicación, si el usuario no existe se crea, se dirige al modulo de tags. Crear un tag, validar que aparezca en la lista de tags y salir de la aplicación', () => {
  const loginUser = require('../funcionalidades/ingresarLogin')
  const registerUser = require('../funcionalidades/registrarUsuario')
  const salirAplicacion = require('../funcionalidades/salirAplicacion')
  const tagAplicacion = require('../funcionalidades/tagAplicacion')
  const tagAplicacionCrear = require('../funcionalidades/tagAplicacionCrear')
  const tagAplicacionBuscar = require('../funcionalidades/tagAplicacionBuscar')
  const tagAplicacionEliminar = require('../funcionalidades/tagAplicacionEliminar')
  const { faker } = require('@faker-js/faker')
  let nameTag;
  
  beforeEach(()=> {
    cy.clearCookies()
    cy.visit('/')
    
    cy.get('main').then(($main) => {
      if($main.find('form').length > 0){
        if($main.find('form')[0].id == 'setup') { 
          cy.screenshot('Escenario01_registrarUsuario_')           
          registerUser.registerUser(cy, Cypress.env('NAMEBLOG'), Cypress.env('FULLNAME'), Cypress.env('USER'), Cypress.env('PASSWORD'))
          salirAplicacion.salirAplicacion(cy)
        }
      }
    })    
    loginUser.loginUser(cy, Cypress.env('USER'), Cypress.env('PASSWORD'))
    cy.screenshot('Escenario02_ingresoLogin_')
})
  
  it('crear un tag', () => {
    if(Cypress.env('isRegresionVisual') == false){
      nameTag = faker.name.jobType();
    } else {
      nameTag = 'Tag Prueba';
    }
    cy.screenshot('Escenario13_crear_tag_')
    tagAplicacion.tagAplicacion(cy)
    cy.screenshot('Escenario13_crear_tag_')
    tagAplicacionCrear.tagAplicacionCrear(cy, nameTag)
    cy.screenshot('Escenario13_crear_tag_')
    tagAplicacion.tagAplicacion(cy)
    cy.screenshot('Escenario13_crear_tag_')
    tagAplicacionBuscar.tagAplicacionBuscar(cy, nameTag, true)
    cy.screenshot('Escenario13_crear_tag_')
    if(Cypress.env('isRegresionVisual') != false) {
      tagAplicacionEliminar.tagAplicacionEliminar(cy, nameTag)
      tagAplicacionBuscar.tagAplicacionBuscar(cy, nameTag, false)
    }
    salirAplicacion.salirAplicacion(cy)
  })

  afterEach(() => {
    
  });
})