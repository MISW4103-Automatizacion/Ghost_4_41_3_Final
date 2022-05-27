const registerUser = require('../funcionalidades/registrarUsuario')
const pageMenuLeftAplicacion = require('../funcionalidades/MenuLeftAplicacion')
const pagePost = require('../funcionalidades/pagePost')
const { faker } = require('@faker-js/faker')
const pageLogin = require('../funcionalidades/Login')
const datos = require('../datos/login.json')
let tituloTest = '';
let textoTest = '';
let email='';

beforeEach(()=> {
    cy.clearCookies()
    cy.visit('/')
    cy.get('main').then(($main) => {
        if($main.find('form').length > 0) {
            if($main.find('form')[0].id == 'setup') { 
                cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_registrar');           
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
    cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_login');
    pageLogin.clicSignIn(cy)
    cy.wait(3000)
})

it(`Crear un post con título normal y texto normal`, () => {
    if (Cypress.env('isRegresionVisual') == false) {
        tituloTest = faker.lorem.sentence();
        textoTest = faker.lorem.paragraph();
    }else{
        tituloTest = 'Mi primer post';
        textoTest = 'Qui in ex. Facilis et non molestiae. Illum debitis unde ad sapiente nisi corrupti est culpa quia. Minima enim animi excepturi. Quia in molestiae aspernatur nihil eos et. Amet et fugiat accusantium saepe quae doloribus culpa est.'
    }
    pagePost.postAplicacionNuevoPost(cy);
    cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_post');
    pagePost.postAplicacionCrearPost(cy, tituloTest, textoTest);
    pagePost.postAplicacionPublicar(cy);
    pagePost.postAplicacionSalirCrearPost(cy)
    pageMenuLeftAplicacion.clicAvatar(cy)
    pageMenuLeftAplicacion.clicSignOut(cy)
});