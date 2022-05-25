describe('Escenarios funcionalidad Post.', () => {
  const registerUser = require('../funcionalidades/registrarUsuario')
  const pageMenuLeftAplicacion = require('../funcionalidades/MenuLeftAplicacion')
  const pagePost = require('../funcionalidades/pagePost')
  const { faker } = require('@faker-js/faker')
  const datosEspeciales = require('../datos/post.json')
  const pageLogin = require('../funcionalidades/Login')
  const datos = require('../datos/login.json')
  let tituloTest = '';
  let textoTest = '';
  let tituloTest2 = '';
  let textoTest2 = '';
  let email='';
  beforeEach(()=> {
      cy.clearCookies()
      cy.visit('/')
      cy.get('main').then(($main) => {
          if($main.find('form').length > 0) {
              if($main.find('form')[0].id == 'setup') { 
                  cy.screenshot('Escenario01_registrarUsuario_')           
                  registerUser.registerUser(cy, Cypress.env('NAMEBLOG'), Cypress.env('FULLNAME'), Cypress.env('USER'), Cypress.env('PASSWORD'))
                  cy.wait(3000)
                  pageMenuLeftAplicacion.clicAvatar(cy)
                  pageMenuLeftAplicacion.clicSignOut(cy)
              }
          }
      })

      if(Cypress.env('isRegresionVisual') == false){
          email = faker.internet.email();
      } else {
          email = 'pruebaRegresion@regresion.com.co';
      }
      pageLogin.eMail(cy, datos.EmailValido)
        pageLogin.password(cy, datos.PasswordValido)
        pageLogin.clicSignIn(cy)
        cy.wait(3000)
  })

  it(`Escenario 1. Prueba positiva. Crear un post con título normal y texto normal`, () => {
    if (Cypress.env('isRegresionVisual') == false) {
      tituloTest = faker.lorem.sentence();
      textoTest = faker.lorem.paragraph();
    }else{
      titulo = 'Mi primer post';
      texto = 'Qui in ex. Facilis et non molestiae. Illum debitis unde ad sapiente nisi corrupti est culpa quia. Minima enim animi excepturi. Quia in molestiae aspernatur nihil eos et. Amet et fugiat accusantium saepe quae doloribus culpa est.'
    }
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario17_crear_post_');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario17_crear_post_');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
  });

  it('Escenario 2 Pueba positiva. Crear un post con título y texto con caracteres especiales', () => {
    tituloTest = datosEspeciales[6].title;
    textoTest = datosEspeciales[6].body;
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario 2 Pueba positiva. Crear un post con título y texto con caracteres especiales')
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 2 Pueba positiva. Crear un post con título y texto con caracteres especiales')
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
  });

 it('Escenario 3. Prueba positiva. Crear un post con título con caracteres especiales y texto normal', () => {
  cy.request('GET', 'https://my.api.mockaroo.com/users.json?key=47a96010').then((response) => {
    console.log(response.body[0].email);
    textoTest = response.body[0].body;
    tituloTest = datosEspeciales[14].title;        
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario 3. Prueba positiva. Crear un post con título con caracteres especiales y texto normal');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 3. Prueba positiva. Crear un post con título con caracteres especiales y texto normal');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
    });
  });

  
  it('Escenario 4. Prueba positiva. Crear un post con título normal y texto con caracteres especiales', () => {
    tituloTest = datosEspeciales[49].title;
    textoTest = faker.lorem.paragraph();
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario 4. Prueba positiva. Crear un post con título normal y texto con caracteres especiales');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 4. Prueba positiva. Crear un post con título normal y texto con caracteres especiales');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
  });

  it('Escenario 5. Prueba negativa. Crear un post con título vacío y texto vacío', () => {
    tituloTest = '';
    textoTest = '';
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario 5. Prueba negativa. Crear un post con título vacío y texto vacío');
    pagePost.postAplicacionComprobarAlerta(cy);
  });

  it('Escenario 6. Prueba negativa. Crear un post con título vacío y texto con caracteres especiales', () => {
    tituloTest = '';
    textoTest = datosEspeciales[65].body;
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario 6. Prueba negativa. Crear un post con título vacío y texto con caracteres especiales');
    pagePost.postAplicacionComprobarAlerta(cy);
  });

  it('Escenario 7. Prueba positiva. Crear un post con título con caracteres especiales y texto vacío.', () => {
    tituloTest = datosEspeciales[25].title;
    textoTest = '';
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario 7. Prueba positiva. Crear un post con título con caracteres especiales y texto vacío.');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 7. Prueba positiva. Crear un post con título con caracteres especiales y texto vacío.');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
  });

  it('Escenario 8. Prueba negativa. Crear un post con título vacío y texto normal.', () => {
    tituloTest = '';
    textoTest = faker.lorem.paragraph();
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario 8. Prueba negativa. Crear un post con título vacío y texto normal.',);
    pagePost.postAplicacionComprobarAlerta(cy);
   });

  it('Escenario 9. Prueba negativa. Crear un post con título de más de 255 caracteres y texto vacío.', () => {
    tituloTest = faker.lorem.paragraphs(5).replace('\n','').slice(0,256)
    textoTest = ''
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    cy.screenshot('Escenario 9. Prueba negativa. Crear un post con título de más de 255 caracteres y texto vacío.');
    pagePost.postAplicacionNoBotonPost(cy);
  });

  it('Escenario 10. Prueba negativa. Crear un post con título de más de 255 caracteres y texto con caracteres especiales.', () => {
    tituloTest = faker.lorem.paragraphs(5).replace('\n','').slice(0,256);
    textoTest = datosEspeciales[68].body;
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    cy.screenshot('Escenario 10. Prueba negativa. Crear un post con título de más de 255 caracteres y texto con caracteres especiales.');
    pagePost.postAplicacionNoBotonPost(cy);
  });

  it('Escenario 11. Prueba negativa. Crear un post con título de más de 255 caracteres y texto normal.', () => {
    tituloTest = faker.lorem.paragraphs(5).replace('\n','').slice(0,256);
    textoTest = faker.lorem.paragraph();
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    cy.screenshot('Escenario 11. Prueba negativa. Crear un post con título de más de 255 caracteres y texto con caracteres especiales.');
    pagePost.postAplicacionNoBotonPost(cy);
    });

  it('Escenario 12. Prueba positiva. Crear un post con título y texto normal y modificarlo por texto y título normales', () => {
    if (Cypress.env('isRegresionVisual') == false) {
      tituloTest = faker.lorem.sentence();
      textoTest = faker.lorem.paragraph();
      tituloTest2 = faker.lorem.sentence();
      textoTest2 = faker.lorem.paragraph();
    }else{
      tituloTest = 'Mi primer post';
      textoTest = 'Qui in ex. Facilis et non molestiae. Illum debitis unde ad sapiente nisi corrupti est culpa quia. Minima enim animi excepturi. Quia in molestiae aspernatur nihil eos et. Amet et fugiat accusantium saepe quae doloribus culpa est.'
      tituloTest2 = 'Mi segundo post'
      textoTest2 = 'Qui totam dignissimos sed ipsam aliquid est tempora error. Sit labore quisquam qui magni galisum est amet fugit ut asperiores nisi aut aliquid maiores vel enim velit.'
    }
      pagePost.postAplicacionNuevoPost(cy);
      pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
      pagePost.postAplicacionPublicar(cy);
      cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario18_modificar_post_');
      pagePost.postAplicacionSalirCrearPost(cy);
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
      cy.wait(4000);
      pagePost.postAplicacionIrPaginaPublica(cy);
      cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario18_modificar_post_');
      pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
      pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
      cy.visit('/')
      pageLogin.eMail(cy, datos.EmailValido)
      pageLogin.password(cy, datos.PasswordValido)
      pageLogin.clicSignIn(cy)
      cy.wait(3000)
      pagePost.postAplicacionPosts(cy);
      pagePost.postAplicacionIrPrimerPost(cy);
      pagePost.postAplicacionModificarPost(cy, tituloTest2, textoTest2);
      pagePost.postAplicacionUpdate(cy);
      cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario18_modificar_post_');
      pagePost.postAplicacionSalirCrearPost(cy);
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
      cy.wait(4000);
      pagePost.postAplicacionIrPaginaPublica(cy);
      pagePost.postAplicacionComprobarTitulo(cy, tituloTest2, true);
      cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario18_modificar_post_');
      pagePost.postAplicacionComprobarTexto(cy, textoTest2, true);
  });

  it('Escenario 13. Prueba positiva. Crear un post con título y texto normal y modificarlo por texto y título con caracteres especiales', () => {
    cy.request('GET', 'https://my.api.mockaroo.com/users.json?key=47a96010').then((response) => {
      tituloTest = response.body[0].title;
      textoTest = response.body[0].body;
      tituloTest2 = datosEspeciales[2].title;
      textoTest2 = datosEspeciales[3].body;
      pagePost.postAplicacionNuevoPost(cy);
      pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
      pagePost.postAplicacionPublicar(cy);
      cy.screenshot('Escenario 13. Prueba positiva. Crear un post con título y texto normal y modificarlo por texto y título con caracteres especiales');
      pagePost.postAplicacionSalirCrearPost(cy);
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
      cy.wait(4000);
      pagePost.postAplicacionIrPaginaPublica(cy);
      cy.screenshot('Escenario 13. Prueba positiva. Crear un post con título y texto normal y modificarlo por texto y título con caracteres especiales');
      pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
      pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
      cy.visit('/')
      pageLogin.eMail(cy, datos.EmailValido)
      pageLogin.password(cy, datos.PasswordValido)
      pageLogin.clicSignIn(cy)
      cy.wait(3000)
      pagePost.postAplicacionPosts(cy);
      pagePost.postAplicacionIrPrimerPost(cy);
      pagePost.postAplicacionModificarPost(cy, tituloTest2, textoTest2);
      pagePost.postAplicacionUpdate(cy);
      cy.screenshot('Escenario 13. Prueba positiva. Crear un post con título y texto normal y modificarlo por texto y título con caracteres especiales');
      pagePost.postAplicacionSalirCrearPost(cy);
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
      cy.wait(4000);
      pagePost.postAplicacionIrPaginaPublica(cy);
      cy.screenshot('Escenario 13. Prueba positiva. Crear un post con título y texto normal y modificarlo por texto y título con caracteres especiales');
      pagePost.postAplicacionComprobarTitulo(cy, tituloTest2, true);
      pagePost.postAplicacionComprobarTexto(cy, textoTest2, true);
    });
  });

  it('Escenario 14. Prueba positiva. Crear un post con título y texto normal y modificarlo por título con caracteres especiales y texto normal', () => {
    cy.request('GET', 'https://my.api.mockaroo.com/users.json?key=47a96010').then((response) => {
      tituloTest = response.body[0].title;
      textoTest = response.body[0].body;
      tituloTest2 = datosEspeciales[3].title;
      textoTest2 = response.body[1].body;
      pagePost.postAplicacionNuevoPost(cy);
      pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
      pagePost.postAplicacionPublicar(cy);
      cy.screenshot('Escenario 14. Prueba positiva. Crear un post con título y texto normal y modificarlo por título con caracteres especiales y texto normal');
      pagePost.postAplicacionSalirCrearPost(cy);
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
      cy.wait(4000);
      pagePost.postAplicacionIrPaginaPublica(cy);
      cy.screenshot('Escenario 14. Prueba positiva. Crear un post con título y texto normal y modificarlo por título con caracteres especiales y texto normal');
      pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
      pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
      cy.visit('/')
      pageLogin.eMail(cy, datos.EmailValido)
      pageLogin.password(cy, datos.PasswordValido)
      pageLogin.clicSignIn(cy)
      cy.wait(3000)
      pagePost.postAplicacionPosts(cy);
      pagePost.postAplicacionIrPrimerPost(cy);
      pagePost.postAplicacionModificarPost(cy, tituloTest2, textoTest2);
      pagePost.postAplicacionUpdate(cy);
      cy.screenshot('Escenario 14. Prueba positiva. Crear un post con título y texto normal y modificarlo por título con caracteres especiales y texto normal');
      pagePost.postAplicacionSalirCrearPost(cy);
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
      cy.wait(4000);
      pagePost.postAplicacionIrPaginaPublica(cy);
      cy.screenshot('Escenario 14. Prueba positiva. Crear un post con título y texto normal y modificarlo por título con caracteres especiales y texto normal');
      pagePost.postAplicacionComprobarTitulo(cy, tituloTest2, true);
      pagePost.postAplicacionComprobarTexto(cy, textoTest2, true);
    });
  });

  it('Escenario 15. Prueba positiva. Crear un post con título y texto normal y modificarlo por texto con caracteres especiales y título normal', () => {
    cy.request('GET', 'https://my.api.mockaroo.com/users.json?key=47a96010').then((response) => {
      tituloTest = response.body[0].title;
      textoTest = response.body[0].body;
      tituloTest2 = response.body[1].title;
      textoTest2 = datosEspeciales[4].body;
      pagePost.postAplicacionNuevoPost(cy);
      pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
      pagePost.postAplicacionPublicar(cy);
      cy.screenshot('Escenario 15. Prueba positiva. Crear un post con título y texto normal y modificarlo por texto con caracteres especiales y título normal');
      pagePost.postAplicacionSalirCrearPost(cy);
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
      cy.wait(4000);
      pagePost.postAplicacionIrPaginaPublica(cy);
      cy.screenshot('Escenario 15. Prueba positiva. Crear un post con título y texto normal y modificarlo por texto con caracteres especiales y título normal');
      pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
      pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
      cy.visit('/')
      pageLogin.eMail(cy, datos.EmailValido)
      pageLogin.password(cy, datos.PasswordValido)
      pageLogin.clicSignIn(cy)
      cy.wait(3000)
      pagePost.postAplicacionPosts(cy);
      pagePost.postAplicacionIrPrimerPost(cy);
      pagePost.postAplicacionModificarPost(cy, tituloTest2, textoTest2);
      pagePost.postAplicacionUpdate(cy);
      cy.screenshot('Escenario 15. Prueba positiva. Crear un post con título y texto normal y modificarlo por texto con caracteres especiales y título normal');
      pagePost.postAplicacionSalirCrearPost(cy);
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
      cy.wait(4000);
      pagePost.postAplicacionIrPaginaPublica(cy);
      cy.screenshot('Escenario 15. Prueba positiva. Crear un post con título y texto normal y modificarlo por texto con caracteres especiales y título normal');
      pagePost.postAplicacionComprobarTitulo(cy, tituloTest2, true);
      pagePost.postAplicacionComprobarTexto(cy, textoTest2, true);
    });
  });

  it('Escenario 16. Prueba negativa. Crear un post con título y texto normal y modificarlo por texto y título vacíos', () => {
    tituloTest = faker.lorem.sentence();
    textoTest = faker.lorem.paragraph();
    tituloTest2 = '';
    textoTest2 = '';
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario 16. Prueba negativa. Crear un post con título y texto normal y modificarlo por texto y título vacíos');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 16. Prueba negativa. Crear un post con título y texto normal y modificarlo por texto y título vacíos');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
    cy.visit('/')
    pageLogin.eMail(cy, datos.EmailValido)
    pageLogin.password(cy, datos.PasswordValido)
    pageLogin.clicSignIn(cy)
    cy.wait(3000)
    pagePost.postAplicacionPosts(cy);
    pagePost.postAplicacionIrPrimerPost(cy);
    pagePost.postAplicacionModificarPost(cy, tituloTest2, textoTest2);
    pagePost.postAplicacionUpdate(cy);
    cy.screenshot('Escenario 16. Prueba negativa. Crear un post con título y texto normal y modificarlo por texto y título vacíos');
    pagePost.postAplicacionComprobarAlerta(cy);
  });

  it('Escenario 17. Prueba negativa. Crear un post con título y texto normal y modificarlo por título vacío y texto con caracteres especiales', () => {
    tituloTest = faker.lorem.sentence();
    textoTest = faker.lorem.paragraph();
    tituloTest2 = '';
    textoTest2 = datosEspeciales[4].body;
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario 17. Prueba negativa. Crear un post con título y texto normal y modificarlo por título vacío y texto con caracteres especiales');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 17. Prueba negativa. Crear un post con título y texto normal y modificarlo por título vacío y texto con caracteres especiales');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
    cy.visit('/')
    pageLogin.eMail(cy, datos.EmailValido)
    pageLogin.password(cy, datos.PasswordValido)
    pageLogin.clicSignIn(cy)
    cy.wait(3000)
    pagePost.postAplicacionPosts(cy);
    pagePost.postAplicacionIrPrimerPost(cy);
    pagePost.postAplicacionModificarPost(cy, tituloTest2, textoTest2);
    pagePost.postAplicacionUpdate(cy);
    cy.screenshot('Escenario 17. Prueba negativa. Crear un post con título y texto normal y modificarlo por título vacío y texto con caracteres especiales');
    pagePost.postAplicacionComprobarAlerta(cy);
  });

  it('Escenario 18. Prueba positiva. Crear un post con título y texto normal y modificarlo por título con caracteres especiales y texto vacío', () => {
    tituloTest = faker.lorem.sentence();
    textoTest = faker.lorem.paragraph();
    tituloTest2 = datosEspeciales[41].title;
    textoTest2 = '';
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario 18. Prueba positiva. Crear un post con título y texto normal y modificarlo por título con caracteres especiales y texto vacío');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 18. Prueba positiva. Crear un post con título y texto normal y modificarlo por título con caracteres especiales y texto vacío');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
    cy.visit('/')
    pageLogin.eMail(cy, datos.EmailValido)
    pageLogin.password(cy, datos.PasswordValido)
    pageLogin.clicSignIn(cy)
    cy.wait(3000)
    pagePost.postAplicacionPosts(cy);
    pagePost.postAplicacionIrPrimerPost(cy);
    pagePost.postAplicacionModificarPost(cy, tituloTest2, textoTest2);
    pagePost.postAplicacionUpdate(cy);
    cy.screenshot('Escenario 18. Prueba positiva. Crear un post con título y texto normal y modificarlo por título con caracteres especiales y texto vacío');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 18. Prueba positiva. Crear un post con título y texto normal y modificarlo por título con caracteres especiales y texto vacío');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest2, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest2, true);
  });

  it('Escenario 19. Prueba positiva. Crear un post con título y texto normal y modificarlo por título normal y texto vacío', () => {
    cy.request('GET', 'https://my.api.mockaroo.com/users.json?key=47a96010').then((response) => {
      tituloTest = faker.lorem.sentence();
      textoTest = faker.lorem.paragraph();
      tituloTest2 = faker.lorem.sentence();
      textoTest2 = '';
      pagePost.postAplicacionNuevoPost(cy);
      pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
      pagePost.postAplicacionPublicar(cy);
      cy.screenshot('Escenario 19. Prueba positiva. Crear un post con título y texto normal y modificarlo por título normal y texto vacío');
      pagePost.postAplicacionSalirCrearPost(cy);
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
      cy.wait(4000);
      pagePost.postAplicacionIrPaginaPublica(cy);
      cy.screenshot('Escenario 19. Prueba positiva. Crear un post con título y texto normal y modificarlo por título normal y texto vacío');
      pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
      pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
      cy.visit('/')
      pageLogin.eMail(cy, datos.EmailValido)
      pageLogin.password(cy, datos.PasswordValido)
      pageLogin.clicSignIn(cy)
      cy.wait(3000)
      pagePost.postAplicacionPosts(cy);
      pagePost.postAplicacionIrPrimerPost(cy);
      pagePost.postAplicacionModificarPost(cy, tituloTest2, textoTest2);
      pagePost.postAplicacionUpdate(cy);
      cy.screenshot('Escenario 19. Prueba positiva. Crear un post con título y texto normal y modificarlo por título normal y texto vacío');
      pagePost.postAplicacionSalirCrearPost(cy);
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
      cy.wait(4000);
      pagePost.postAplicacionIrPaginaPublica(cy);
      cy.screenshot('Escenario 19. Prueba positiva. Crear un post con título y texto normal y modificarlo por título normal y texto vacío');
      pagePost.postAplicacionComprobarTitulo(cy, tituloTest2, true);
      pagePost.postAplicacionComprobarTexto(cy, textoTest2, true);
    });
  });

  it('Escenario 20. Prueba negativa. Crear un post con título y texto normal y modificarlo por título vacío y texto normal', () => {
    tituloTest = faker.lorem.sentence();
    textoTest = faker.lorem.paragraph();
    tituloTest2 = '';
    textoTest2 = faker.lorem.paragraph();
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario 20. Prueba negativa. Crear un post con título y texto normal y modificarlo por título vacío y texto normal');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 20. Prueba negativa. Crear un post con título y texto normal y modificarlo por título vacío y texto normal');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
    cy.visit('/')
    pageLogin.eMail(cy, datos.EmailValido)
    pageLogin.password(cy, datos.PasswordValido)
    pageLogin.clicSignIn(cy)
    cy.wait(3000)
    pagePost.postAplicacionPosts(cy);
    pagePost.postAplicacionIrPrimerPost(cy);
    pagePost.postAplicacionModificarPost(cy, tituloTest2, textoTest2);
    cy.wait(2000)
    pagePost.postAplicacionUpdate(cy);
    cy.screenshot('Escenario 20. Prueba negativa. Crear un post con título y texto normal y modificarlo por título vacío y texto normal');
    pagePost.postAplicacionComprobarAlerta(cy);
  });

  it('Escenario 21. Prueba negativa. Crear un post con título y texto normal y modificarlo por título  con más de 255 caracteres y texto vacío', () => {
    tituloTest = faker.lorem.sentence();
    textoTest = faker.lorem.paragraph();
    tituloTest2 = faker.lorem.paragraphs(5).replace('\n','').slice(0,256);
    textoTest2 = '';
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario 21. Prueba negativa. Crear un post con título y texto normal y modificarlo por título  con más de 255 caracteres y texto vacío');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 21. Prueba negativa. Crear un post con título y texto normal y modificarlo por título  con más de 255 caracteres y texto vacío');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
    cy.visit('/')
    pageLogin.eMail(cy, datos.EmailValido)
    pageLogin.password(cy, datos.PasswordValido)
    pageLogin.clicSignIn(cy)
    cy.wait(3000)
    pagePost.postAplicacionPosts(cy);
    pagePost.postAplicacionIrPrimerPost(cy);
    pagePost.postAplicacionModificarPost(cy, tituloTest2, textoTest2);  
    pagePost.postAplicacionUpdate(cy);
    cy.screenshot('Escenario 21. Prueba negativa. Crear un post con título y texto normal y modificarlo por título  con más de 255 caracteres y texto vacío');
    pagePost.postAplicacionComprobarAlerta(cy);
  });

 it('Escenario 22. Prueba negativa. Crear un post con título y texto normal y modificarlo por título  con más de 255 caracteres y texto con caracteres especiales', () => {
    tituloTest = faker.lorem.sentence();
    textoTest = faker.lorem.paragraph();
    tituloTest2 = faker.lorem.paragraphs(5).replace('\n','').slice(0,256);
    textoTest2 = datosEspeciales[42].body;
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario 22. Prueba negativa. Crear un post con título y texto normal y modificarlo por título  con más de 255 caracteres y texto con caracteres especiales');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 22. Prueba negativa. Crear un post con título y texto normal y modificarlo por título  con más de 255 caracteres y texto con caracteres especiales');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
    cy.visit('/')
    pageLogin.eMail(cy, datos.EmailValido)
    pageLogin.password(cy, datos.PasswordValido)
    pageLogin.clicSignIn(cy)
    cy.wait(3000)
    pagePost.postAplicacionPosts(cy);
    pagePost.postAplicacionIrPrimerPost(cy);
    pagePost.postAplicacionModificarPost(cy, tituloTest2, textoTest2);
    pagePost.postAplicacionUpdate(cy);
    cy.screenshot('Escenario 22. Prueba negativa. Crear un post con título y texto normal y modificarlo por título  con más de 255 caracteres y texto con caracteres especiales');
    pagePost.postAplicacionComprobarAlerta(cy);
  });

  it('Escenario 23. Prueba negativa. Crear un post con título y texto normal y modificarlo por título  con más de 255 caracteres y texto normal', () => {
    tituloTest = faker.lorem.sentence();
    textoTest = faker.lorem.paragraph();
    tituloTest2 = faker.lorem.paragraphs(5).replace('\n','').slice(0,256);
    textoTest = faker.lorem.paragraph();
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario 23. Prueba negativa. Crear un post con título y texto normal y modificarlo por título  con más de 255 caracteres y texto normal');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 23. Prueba negativa. Crear un post con título y texto normal y modificarlo por título  con más de 255 caracteres y texto normal');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
    cy.visit('/')
    pageLogin.eMail(cy, datos.EmailValido)
    pageLogin.password(cy, datos.PasswordValido)
    pageLogin.clicSignIn(cy)
    cy.wait(3000)
    pagePost.postAplicacionPosts(cy);
    pagePost.postAplicacionIrPrimerPost(cy);
    pagePost.postAplicacionModificarPost(cy, tituloTest2, textoTest2);
    pagePost.postAplicacionUpdate(cy);
    cy.screenshot('Escenario 23. Prueba negativa. Crear un post con título y texto normal y modificarlo por título  con más de 255 caracteres y texto normal');
    pagePost.postAplicacionComprobarAlerta(cy);
  });

  it('Escenario 24. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título y texto normal', () => {
    tituloTest = datosEspeciales[43].title;
    textoTest = datosEspeciales[43].body;
    tituloTest2 = faker.lorem.sentence();
    textoTest2 = faker.lorem.paragraph();
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario 24. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título y texto normal');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 24. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título y texto normal');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
    cy.visit('/')
    pageLogin.eMail(cy, datos.EmailValido)
    pageLogin.password(cy, datos.PasswordValido)
    pageLogin.clicSignIn(cy)
    cy.wait(3000)
    pagePost.postAplicacionPosts(cy);
    pagePost.postAplicacionIrPrimerPost(cy);
    pagePost.postAplicacionModificarPost(cy, tituloTest2, textoTest2);
    pagePost.postAplicacionUpdate(cy);
    cy.screenshot('Escenario 24. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título y texto normal');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 24. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título y texto normal');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest2, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest2, true);
  });

  it('Escenario 25. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título con caracteres especiales y texto normal', () => {
    tituloTest = datosEspeciales[44].title;
    textoTest = datosEspeciales[44].body;
    tituloTest2 = datosEspeciales[46].title;
    textoTest2 = faker.lorem.paragraph();
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario 25. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título con caracteres especiales y texto normal');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 25. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título con caracteres especiales y texto normal');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
    cy.visit('/')
    pageLogin.eMail(cy, datos.EmailValido)
    pageLogin.password(cy, datos.PasswordValido)
    pageLogin.clicSignIn(cy)
    cy.wait(3000)
    pagePost.postAplicacionPosts(cy);
    pagePost.postAplicacionIrPrimerPost(cy);
    pagePost.postAplicacionModificarPost(cy, tituloTest2, textoTest2);
    pagePost.postAplicacionUpdate(cy);
    cy.screenshot('Escenario 25. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título con caracteres especiales y texto normal');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 25. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título con caracteres especiales y texto normal');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest2, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest2, true);
  });

  it('Escenario 26. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título normal y texto con caracteres especiales', () => {
    tituloTest = datosEspeciales[52].title;
    textoTest = datosEspeciales[52].body;
    tituloTest2 = faker.lorem.sentence();
    textoTest2 = datosEspeciales[47].body;
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario 26. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título normal y texto con caracteres especiales');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 26. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título normal y texto con caracteres especiales');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
    cy.visit('/')
    pageLogin.eMail(cy, datos.EmailValido)
    pageLogin.password(cy, datos.PasswordValido)
    pageLogin.clicSignIn(cy)
    cy.wait(3000)
    pagePost.postAplicacionPosts(cy);
    pagePost.postAplicacionIrPrimerPost(cy);
    pagePost.postAplicacionModificarPost(cy, tituloTest2, textoTest2);
    pagePost.postAplicacionUpdate(cy);
    cy.screenshot('Escenario 26. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título normal y texto con caracteres especiales');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 26. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título normal y texto con caracteres especiales');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest2, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest2, true);
  });

  it('Escenario 27. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título con caracteres especiales y texto vacío', () => {
    tituloTest = datosEspeciales[53].title;
    textoTest = datosEspeciales[53].body;
    tituloTest2 = datosEspeciales[54].title;
    textoTest2 = '';
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario 27. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título con caracteres especiales y texto vacío');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 27. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título con caracteres especiales y texto vacío');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
    cy.visit('/')
    pageLogin.eMail(cy, datos.EmailValido)
    pageLogin.password(cy, datos.PasswordValido)
    pageLogin.clicSignIn(cy)
    cy.wait(3000)
    pagePost.postAplicacionPosts(cy);
    pagePost.postAplicacionIrPrimerPost(cy);
    pagePost.postAplicacionModificarPost(cy, tituloTest2, textoTest2);
    pagePost.postAplicacionUpdate(cy);
    cy.screenshot('Escenario 27. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título con caracteres especiales y texto vacío');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 27. Prueba positiva. Crear un post con título y texto con caracteres especiales y modificarlo por título con caracteres especiales y texto vacío');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest2, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest2, true);
  });

  it('Escenario 28. Prueba positiva. Crear un post con título y texto con caracteres especiales y eliminarlo', () => {
    tituloTest = datosEspeciales[54].title;
    textoTest = datosEspeciales[54].body;
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Escenario 28. Prueba positiva. Crear un post con título y texto con caracteres especiales y eliminarlo');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 28. Prueba positiva. Crear un post con título y texto con caracteres especiales y eliminarlo');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
    cy.visit('/')
    pageLogin.eMail(cy, datos.EmailValido)
    pageLogin.password(cy, datos.PasswordValido)
    pageLogin.clicSignIn(cy)
    cy.wait(3000)
    pagePost.postAplicacionPosts(cy);
    pagePost.postAplicacionIrPrimerPost(cy);
    pagePost.postAplicacionEliminar(cy);
    cy.screenshot('Escenario 28. Prueba positiva. Crear un post con título y texto con caracteres especiales y eliminarlo');
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Escenario 28. Prueba positiva. Crear un post con título y texto con caracteres especiales y eliminarlo');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, false);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, false);
  });

  it('Escenario 29. Prueba positiva. Crear un post con título y texto con caracteres normales y eliminarlo', () => {
    if (Cypress.env('isRegresionVisual') == false) {
      tituloTest = faker.lorem.sentence();
      textoTest = faker.lorem.paragraph();
      tituloTest2 = faker.lorem.sentence();
      textoTest2 = faker.lorem.paragraph();
    }else{
      tituloTest = 'Mi primer post';
      textoTest = 'Qui in ex. Facilis et non molestiae. Illum debitis unde ad sapiente nisi corrupti est culpa quia. Minima enim animi excepturi. Quia in molestiae aspernatur nihil eos et. Amet et fugiat accusantium saepe quae doloribus culpa est.'
      tituloTest2 = 'Mi segundo post'
      textoTest2 = 'Qui totam dignissimos sed ipsam aliquid est tempora error. Sit labore quisquam qui magni galisum est amet fugit ut asperiores nisi aut aliquid maiores vel enim velit.'
    }
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario19_eliminar_post_');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario19_eliminar_post_');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
    cy.visit('/')
    pageLogin.eMail(cy, datos.EmailValido)
    pageLogin.password(cy, datos.PasswordValido)
    pageLogin.clicSignIn(cy)
    cy.wait(3000)
    pagePost.postAplicacionPosts(cy);
    pagePost.postAplicacionIrPrimerPost(cy);
    pagePost.postAplicacionEliminar(cy);
    cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario19_eliminar_post_');
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario19_eliminar_post_');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, false);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, false);
  });
  it('Escenario 30. Prueba positiva. Crear un post con título y texto con caracteres normales, modificarlo por título y texto normales y eliminarlo', () => {
    if (Cypress.env('isRegresionVisual') == false) {
      tituloTest = faker.lorem.sentence();
      textoTest = faker.lorem.paragraph();
      tituloTest2 = faker.lorem.sentence();
      textoTest2 = faker.lorem.paragraph();
    }else{
      tituloTest = 'Mi primer post';
      textoTest = 'Qui in ex. Facilis et non molestiae. Illum debitis unde ad sapiente nisi corrupti est culpa quia. Minima enim animi excepturi. Quia in molestiae aspernatur nihil eos et. Amet et fugiat accusantium saepe quae doloribus culpa est.'
      tituloTest2 = 'Mi segundo post'
      textoTest2 = 'Qui totam dignissimos sed ipsam aliquid est tempora error. Sit labore quisquam qui magni galisum est amet fugit ut asperiores nisi aut aliquid maiores vel enim velit.'
    }
    pagePost.postAplicacionNuevoPost(cy);
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario20_crear_modificar_eliminar_post');
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario20_crear_modificar_eliminar_post');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest, true);
    cy.visit('/')
    pageLogin.eMail(cy, datos.EmailValido)
    pageLogin.password(cy, datos.PasswordValido)
    pageLogin.clicSignIn(cy)
    cy.wait(3000)
    pagePost.postAplicacionPosts(cy);
    pagePost.postAplicacionIrPrimerPost(cy);
    pagePost.postAplicacionModificarPost(cy, tituloTest2, textoTest2);
    pagePost.postAplicacionUpdate(cy);
    pagePost.postAplicacionSalirCrearPost(cy);
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario20_crear_modificar_eliminar_post');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest2, true);
    pagePost.postAplicacionComprobarTexto(cy, textoTest2, true);
    cy.visit('/')    
    pageLogin.eMail(cy, datos.EmailValido)
    pageLogin.password(cy, datos.PasswordValido)
    pageLogin.clicSignIn(cy)
    cy.wait(3000)
    pagePost.postAplicacionPosts(cy);
    pagePost.postAplicacionIrPrimerPost(cy);
    pagePost.postAplicacionEliminar(cy);
    cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario20_crear_modificar_eliminar_post');
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
    cy.wait(4000);
    pagePost.postAplicacionIrPaginaPublica(cy);
    cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario20_crear_modificar_eliminar_post');
    pagePost.postAplicacionComprobarTitulo(cy, tituloTest2, false);
    pagePost.postAplicacionComprobarTexto(cy, textoTest2, false);
    
    
  });

})

