describe('Escenario 18 Ingresar a la aplicación, si el usuario no existe se crea. Crear un post y publicarlo. Salir de la aplicación, dirigirse a la pagina Web y validar que aparezca el post en la página. Ingresar a la aplicación, ir al módulo de posts y modificar el primer post. Salir de la aplicación, dirigirse a la pagina Web y validar que aparezca el post en la página.', () => {
    const loginUser = require('../funcionalidades/ingresarLogin')
    const registerUser = require('../funcionalidades/registrarUsuario')
    const salirAplicacion = require('../funcionalidades/salirAplicacion')
    const postAplicacionCrear = require('../funcionalidades/postAplicacionCrear')
    const postAplicacionPublicar = require('../funcionalidades/postAplicacionPublicar')
    const postAplicacionComprobar = require('../funcionalidades/postAplicacionComprobar')
    const postAplicacionPosts = require('../funcionalidades/postAplicacionPosts')
    const postAplicacionIrPrimerPost = require('../funcionalidades/postAplicacionIrPrimerPost')
    const postAplicacionIrNuevoPost = require('../funcionalidades/postAplicacionIrNuevoPost')
    const postAplicacionModificar = require('../funcionalidades/postAplicacionModificar')
    const postAplicacionUpdate = require('../funcionalidades/postAplicacionUpdate')
    const postAplicacionEliminar = require('../funcionalidades/postAplicacionEliminar')
    const postAplicacionSalirCrearPost = require('../funcionalidades/postAplicacionSalirCrearPost')
    const { faker } = require('@faker-js/faker')
    
    beforeEach(()=> {
      cy.clearCookies()
      cy.visit('/')
      
      cy.get('main').then(($main) => {
        if($main.find('form').length > 0){
          if($main.find('form')[0].id == 'setup') {            
            registerUser.registerUser(cy, Cypress.env('NAMEBLOG'), Cypress.env('FULLNAME'), Cypress.env('USER'), Cypress.env('PASSWORD'))
            cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario1_registrarUsuario_')
            salirAplicacion.salirAplicacion(cy)
          }
        }
      })      
      loginUser.loginUser(cy, Cypress.env('USER'), Cypress.env('PASSWORD'))
      cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario1_ingresoLogin_')
    });
    
    it('Crear y modificar un post', () => {
      let titulo = '';
      let texto = '';
      let titulo2 = '';
      let escenario = '_Escenario18_modificar_post_';
      if (Cypress.env('isRegresionVisual') == false) {
        titulo = faker.lorem.sentence();
        texto = faker.lorem.paragraph();
        titulo2 = faker.lorem.sentence()
      }else{
        titulo = 'Mi primer post';
        texto = 'Qui in ex. Facilis et non molestiae. Illum debitis unde ad sapiente nisi corrupti est culpa quia. Minima enim animi excepturi. Quia in molestiae aspernatur nihil eos et. Amet et fugiat accusantium saepe quae doloribus culpa est.'
        titulo2 = 'Mi segundo post'
      }
      postAplicacionIrNuevoPost.postAplicacionIrNuevoPost(cy);
      cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + escenario);
      postAplicacionCrear.postAplicacionCrear(cy,titulo, texto);
      cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + escenario);
      postAplicacionPublicar.postAplicacionPublicar(cy);
      cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + escenario);
      postAplicacionSalirCrearPost.postAplicacionSalirCrearPost(cy);
      cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + escenario);
      salirAplicacion.salirAplicacion(cy);
      cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + escenario);
      postAplicacionComprobar.postAplicacionComprobar(cy, titulo, true);
      cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + escenario);
      cy.visit('/')
      loginUser.loginUser(cy, Cypress.env('USER'), Cypress.env('PASSWORD'))
      postAplicacionPosts.postAplicacionPosts(cy);
      cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + escenario);
      postAplicacionIrPrimerPost.postAplicacionIrPrimerPost(cy);
      cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + escenario);
      postAplicacionModificar.postAplicacionModificar(cy,titulo2);
      cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + escenario);
      postAplicacionUpdate.postAplicacionUpdate(cy);
      cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + escenario);
      postAplicacionSalirCrearPost.postAplicacionSalirCrearPost(cy);
      salirAplicacion.salirAplicacion(cy);
      cy.wait(4000);
      postAplicacionComprobar.postAplicacionComprobar(cy, titulo2, true)
      cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + escenario);

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