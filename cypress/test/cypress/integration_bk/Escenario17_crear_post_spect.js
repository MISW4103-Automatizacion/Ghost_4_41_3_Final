describe('Escenario 17 Ingresar a la aplicación, si el usuario no existe se crea. Crear un post y publicarlo. Salir de la aplicación, dirigirse a la pagina Web y validar que aparezca el post en la página.', () => {
  const loginUser = require('../funcionalidades/ingresarLogin')
  const registerUser = require('../funcionalidades/registrarUsuario')
  const salirAplicacion = require('../funcionalidades/salirAplicacion')
  const postAplicacionIrNuevoPost = require('../funcionalidades/postAplicacionIrNuevoPost')
  const postAplicacionCrear = require('../funcionalidades/postAplicacionCrear')
  const postAplicacionComprobar = require('../funcionalidades/postAplicacionComprobar')
  const postAplicacionPublicar = require('../funcionalidades/postAplicacionPublicar')
  const postAplicacionSalirCrearPost = require('../funcionalidades/postAplicacionSalirCrearPost')
  const postAplicacionPosts = require('../funcionalidades/postAplicacionPosts')
  const postAplicacionIrPrimerPost = require('../funcionalidades/postAplicacionIrPrimerPost')
  const postAplicacionEliminar = require('../funcionalidades/postAplicacionEliminar')
  const { faker } = require('@faker-js/faker')
  
  beforeEach(()=> {
    cy.clearCookies()
    cy.visit('/')
    cy.get('main').then(($main) => {
      if($main.find('form').length > 0) {
        if($main.find('form')[0].id == 'setup') {
          registerUser.registerUser(cy, Cypress.env('NAMEBLOG'), Cypress.env('FULLNAME'), Cypress.env('USER'), Cypress.env('PASSWORD'))
          salirAplicacion.salirAplicacion(cy)
        }
      }
    })    
    loginUser.loginUser(cy, Cypress.env('USER'), Cypress.env('PASSWORD'))
    cy.screenshot('Escenario17_crear_post_');
  })
  let titulo = '';
  let texto = '';
  it('Crear un post', () => {
    if (Cypress.env('isRegresionVisual') == false) {
      titulo = faker.lorem.sentence();
      texto = faker.lorem.paragraph();
    }else{
      titulo = 'Mi primer post';
      texto = 'Qui in ex. Facilis et non molestiae. Illum debitis unde ad sapiente nisi corrupti est culpa quia. Minima enim animi excepturi. Quia in molestiae aspernatur nihil eos et. Amet et fugiat accusantium saepe quae doloribus culpa est.'
    }
    cy.screenshot('Escenario17_crear_post_');
    postAplicacionIrNuevoPost.postAplicacionIrNuevoPost(cy);
    cy.screenshot('Escenario17_crear_post_');
    postAplicacionCrear.postAplicacionCrear(cy,titulo, texto);
    cy.screenshot('Escenario17_crear_post_');
    postAplicacionPublicar.postAplicacionPublicar(cy);
    cy.screenshot('Escenario17_crear_post_');
    postAplicacionSalirCrearPost.postAplicacionSalirCrearPost(cy);
    cy.screenshot('Escenario17_crear_post_');
    salirAplicacion.salirAplicacion(cy);
    cy.wait(4000);
    cy.screenshot('Escenario17_crear_post_');
    postAplicacionComprobar.postAplicacionComprobar(cy, titulo, true);
    cy.screenshot('Escenario17_crear_post_');
  });
  afterEach(() => {
    cy.visit('/')
    loginUser.loginUser(cy, Cypress.env('USER'), Cypress.env('PASSWORD'))
    postAplicacionPosts.postAplicacionPosts(cy);
    postAplicacionIrPrimerPost.postAplicacionIrPrimerPost(cy);
    postAplicacionEliminar.postAplicacionEliminar(cy);
    salirAplicacion.salirAplicacion(cy);
  });
})