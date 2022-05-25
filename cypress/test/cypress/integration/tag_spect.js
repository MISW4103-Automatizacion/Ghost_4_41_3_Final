describe('Pruebas de Tag', () => {
  const registerUser = require('../funcionalidades/registrarUsuario')
  const pageLogin = require('../funcionalidades/Login')
  const pageMenuLeftAplicacion = require('../funcionalidades/MenuLeftAplicacion')
  const pageTag = require('../funcionalidades/tag')
  const datos = require('../datos/login.json')
  const json = require('../fixtures/tag')
  const { faker } = require('@faker-js/faker')
  var Mockaroo = require('mockaroo');

  let nameTag;
  let nameUpdateTag;
  let color;
  let slug;
  let description;
  let meta_title;
  let meta_description ;
  let canonical_url;
  let data;

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
    pageLogin.eMail(cy, datos.EmailValido)
        pageLogin.password(cy, datos.PasswordValido)
        pageLogin.clicSignIn(cy)
        cy.wait(3000)
  })

it(`Escenario 1, Prueba Positiva, Ingresar a la aplicación, se dirige hasta el modulo de tag. Crear y validar en la lista tag, sale de la aplicación`, () => {
  if(Cypress.env('isRegresionVisual') == false){
    nameTag = faker.name.jobType();
    
  } else {
    nameTag = 'Tag Prueba';
  }
  cy.screenshot('Escenario13_crear_tag_')
  pageTag.tagAplicacion(cy)
  cy.screenshot('Escenario13_crear_tag_')
  pageTag.tagAplicacionCrear(cy, nameTag, json[9].color,json[9].slug,json[9].description,json[9].meta_title,json[9].meta_description,json[9].canonical_url)
  cy.screenshot('Escenario13_crear_tag_')
  pageTag.tagAplicacion(cy)
  cy.screenshot('Escenario13_crear_tag_')
  pageTag.tagAplicacionBuscar(cy, nameTag, true)
  cy.screenshot('Escenario13_crear_tag_')
  if(Cypress.env('isRegresionVisual') != false) {
    pageTag.tagAplicacionEliminar(cy, nameTag)
    pageTag.tagAplicacionBuscar(cy, nameTag, false)
  }
  pageMenuLeftAplicacion.clicAvatar(cy)
  pageMenuLeftAplicacion.clicSignOut(cy)

})

it(`Escenario 2, Prueba Positiva, se dirige al modulo de tags. Crear un tag, lo valida. Modifica un tag y valida que aparezca en la lista de tags y sale de la aplicación`, () => {
  if(Cypress.env('isRegresionVisual') == false){
    nameTag = faker.name.jobType();
    nameUpdateTag = faker.name.jobType();
  } else {
    nameTag = 'Tag Prueba';
    nameUpdateTag = 'Modificado';
  }
  cy.screenshot('_Escenario14_modificar_tag_')
  pageTag.tagAplicacion(cy)
  cy.screenshot('_Escenario14_modificar_tag_')
  pageTag.tagAplicacionCrear(cy, nameTag, json[10].color,json[10].slug,json[10].description,json[10].meta_title,json[10].meta_description,json[10].canonical_url)
  cy.screenshot('_Escenario14_modificar_tag_')
  pageTag.tagAplicacion(cy)
  cy.screenshot('_Escenario14_modificar_tag_')
  pageTag.tagAplicacionBuscar(cy, nameTag, true)
  cy.screenshot('_Escenario14_modificar_tag_')
  pageTag.tagAplicacion(cy)
  pageTag.tagAplicacionModificar(cy,nameUpdateTag)
  cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario14_modificar_tag_')
  pageTag.tagAplicacion(cy)
  cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario14_modificar_tag_')
  pageTag.tagAplicacionBuscar(cy, nameTag, true)
  cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario14_modificar_tag_')
  if(Cypress.env('isRegresionVisual') != false) {
    pageTag.tagAplicacionEliminar(cy, nameTag)
    pageTag.tagAplicacionBuscar(cy, nameTag, false)
  }
  pageMenuLeftAplicacion.clicAvatar(cy)
  pageMenuLeftAplicacion.clicSignOut(cy)

})


it(`Escenario 3, Prueba Positiva, Escenario 15 Ingresar a la aplicación, si el usuario no existe se crea, se dirige al modulo de tags. Crea un tag y valida la creación. Elimina un tag y valida que no aparezca en la lista de tags y sale de la aplicación`, () => {
  if(Cypress.env('isRegresionVisual') == false){
    nameTag = faker.name.jobType();
    nameUpdateTag = faker.name.jobType();
  } else {
    nameTag = 'Tag Prueba';
    nameUpdateTag = 'Modificado';
  }
  cy.screenshot('_Escenario15_eliminar_tag_')
  pageTag.tagAplicacion(cy)
  cy.screenshot('_Escenario15_eliminar_tag_')
  pageTag.tagAplicacionCrear(cy, nameTag, json[11].color,json[11].slug,json[11].description,json[11].meta_title,json[11].meta_description,json[11].canonical_url)
  cy.screenshot('_Escenario15_eliminar_tag_')
  pageTag.tagAplicacion(cy)
  cy.screenshot('_Escenario15_eliminar_tag_')
  pageTag.tagAplicacionBuscar(cy, nameTag, true)
  cy.screenshot('_Escenario15_eliminar_tag_')
  pageTag.tagAplicacion(cy)
  cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario15_eliminar_tag_')
  pageTag.tagAplicacionEliminar(cy,nameTag)
  cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario15_eliminar_tag_')
  pageTag.tagAplicacionBuscar(cy, nameTag, false)
  cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario15_eliminar_tag_')
  if(Cypress.env('isRegresionVisual') != false) {
    pageTag.tagAplicacionEliminar(cy, nameTag)
    pageTag.tagAplicacionBuscar(cy, nameTag, false)
  }
  pageMenuLeftAplicacion.clicAvatar(cy)
  pageMenuLeftAplicacion.clicSignOut(cy)

})

it(`Escenario 4,  Ingresar a la aplicación, si el usuario no existe se crea, se dirige al modulo de tags. Crear y validar tag, modificar y validar tag, eliminar un tag y validar que no aparezca en la lista de tags y salir de la aplicación`, () => {
  if(Cypress.env('isRegresionVisual') == false){
    nameTag = faker.name.jobType();
    nameUpdateTag = faker.name.jobType();
  } else {
    nameTag = 'Tag Prueba';
    nameUpdateTag = 'Modificado';
  }
  cy.screenshot('Escenario16_crear_modificar_eliminar_tag_')
  pageTag.tagAplicacion(cy)
  cy.screenshot('Escenario16_crear_modificar_eliminar_tag_')
  pageTag.tagAplicacionCrear(cy, nameTag, json[12].color,json[12].slug,json[12].description,json[12].meta_title,json[12].meta_description,json[12].canonical_url)
  cy.screenshot('Escenario16_crear_modificar_eliminar_tag_')
  pageTag.tagAplicacion(cy)
  cy.screenshot('Escenario16_crear_modificar_eliminar_tag_')
  pageTag.tagAplicacionBuscar(cy, nameTag, true)
  pageTag.tagAplicacion(cy)
  pageTag.tagAplicacionModificar(cy,nameUpdateTag)
  cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + 'Escenario16_crear_modificar_eliminar_tag_')
  pageTag.tagAplicacion(cy)
  cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + 'Escenario16_crear_modificar_eliminar_tag_')
  pageTag.tagAplicacionBuscar(cy, nameTag, true)
  cy.screenshot('Escenario16_crear_modificar_eliminar_tag_')
  pageTag.tagAplicacion(cy)
  cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + 'Escenario16_crear_modificar_eliminar_tag_')
  pageTag.tagAplicacionEliminar(cy,nameTag)
  pageTag.tagAplicacionBuscar(cy, nameUpdateTag, false)
  cy.screenshot('Escenario16_crear_modificar_eliminar_tag_')
  if(Cypress.env('isRegresionVisual') != false) {
    pageTag.tagAplicacionEliminar(cy, nameTag)
    pageTag.tagAplicacionBuscar(cy, nameTag, false)
  }
  pageMenuLeftAplicacion.clicAvatar(cy)
  pageMenuLeftAplicacion.clicSignOut(cy)

})


it(`Escenario 5, Prueba Negativa, Ingresar a la aplicación, se dirige hasta el modulo de tag. Crear tag con datos vacios y validar, sale de la aplicación`, () => {
    pageTag.tagAplicacion(cy)
    pageTag.tagAplicacionCrear(cy, json[0].tag_name,json[0].color,json[0].slug,json[0].description,json[0].meta_title,json[0].meta_description,json[0].canonical_url)
      cy.wait(1000)
      cy.screenshot('Escenario 5 Prueba Negativa, Crear un Tag con datos vacios')
      cy.contains("Retry").should("be.visible");
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
    })

    it(`Escenario 6, Prueba Negativa, Ingresar a la aplicación, se dirige hasta el modulo de tag.crear un tag  con datos en campo Name y demas datos vacios`, () => {
      pageTag.tagAplicacion(cy)
      pageTag.tagAplicacionCrear(cy, json[1].tag_name,json[1].color,json[1].slug,json[1].description,json[1].meta_title,json[1].meta_description,json[1].canonical_url)
        cy.wait(1000)
        cy.screenshot('Escenario 6 Prueba Negativa, Crear un Tag con campo Name y demas datos vacios')
        cy.contains("Retry").should("be.visible");
        pageMenuLeftAplicacion.clicAvatar(cy)
        pageMenuLeftAplicacion.clicSignOut(cy)
      })

      it(`Escenario 7, Prueba Negativa, Ingresar a la aplicación, se dirige hasta el modulo de tag. Crear un tag ingresando en el campo Name caracters especiales`, () => {
        pageTag.tagAplicacion(cy)
        pageTag.tagAplicacionCrear(cy, json[2].tag_name,json[2].color,json[2].slug,json[2].description,json[2].meta_title,json[2].meta_description,json[2].canonical_url)
        cy.wait(1000)
        cy.screenshot('Escenario 7 Prueba Negativa, Crear un Tag con campo Name con caracteres especiales')
        cy.contains("Retry").should("be.visible");
        pageMenuLeftAplicacion.clicAvatar(cy)
        pageMenuLeftAplicacion.clicSignOut(cy)
    })

    it(`Escenario 8, Prueba Negativa, Ingresar a la aplicación, se dirige hasta el modulo de tag. crear un tag ingresando un color invalido`, () => {
      cy.request('GET', 'https://my.api.mockaroo.com/users.json?key=47a96010').then((response) => {
        
      pageTag.tagAplicacion(cy)
      pageTag.tagAplicacionCrear(cy, response.body[0].nameTag, response.body[0].color,response.body[0].slug,response.body[0].description,response.body[0].meta_title,response.body[0].meta_description.substring(0,153),response.body[0].canonical_url)      
      cy.wait(1000)
      cy.screenshot('Escenario 8 Prueba Negativa, crear un tag ingresando un color invalido')
      cy.contains("Retry").should("be.visible");
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
      })

  
      
  })

    it(`Escenario 9, Prueba Positiva. Ingresar a la aplicación, se dirige hasta el modulo de tag. crear un tag dejando el campo color vacio  `, () => {
      cy.request('GET', 'https://my.api.mockaroo.com/users.json?key=47a96010').then((response) => {
      pageTag.tagAplicacion(cy)
      pageTag.tagAplicacionCrear(cy, response.body[0].nameTag, " ",response.body[0].slug,response.body[0].description,response.body[0].meta_title,response.body[0].meta_description.substring(0,153),response.body[0].canonical_url)      
      cy.wait(1000)
      cy.screenshot('Escenario 9 Prueba Negativa, crear un tag ingresando el campo color  vacio')
      cy.contains("Retry").should("be.visible");
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
    })
  })

  it(`Escenario 10, Prueba Negativa. Ingresar a la aplicación, se dirige hasta el modulo de tag. crear un tag dejando el campo slug vacio`, () => {
    pageTag.tagAplicacion(cy)
    pageTag.tagAplicacionCrear(cy, json[5].tag_name,json[5].color,json[5].slug,json[5].description,json[5].meta_title,json[5].meta_description,json[5].canonical_url)
    cy.wait(1000)
    cy.screenshot('Escenario 10 Prueba Negativa, crear un tag ingresando el campo slug  vacio')
    cy.contains("Retry").should("be.visible");
     pageMenuLeftAplicacion.clicAvatar(cy)
     pageMenuLeftAplicacion.clicSignOut(cy)
  })

  it(`Escenario 11, Prueba Positiva. Ingresar a la aplicación, se dirige hasta el modulo de tag. crear un tag dejando el campo description vacio`, () => {
    cy.request('GET', 'https://my.api.mockaroo.com/users.json?key=47a96010').then((response) => {
      pageTag.tagAplicacion(cy)
      pageTag.tagAplicacionCrear(cy, response.body[0].nameTag, response.body[0].color.substring(1,7),response.body[0].slug," ",response.body[0].meta_title,response.body[0].meta_description.substring(0,153),response.body[0].canonical_url)      
      cy.wait(1000)
       cy.screenshot('Escenario 11 Prueba Positiva, crear un tag ingresando el campo description  vacio')
      cy.contains("Saved").should("be.visible");
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
  })
})

  it(`Escenario 12, Prueba Positiva. Ingresar a la aplicación, se dirige hasta el modulo de tag. crear un tag dejando el campo meta title vacio`, () => {
    cy.request('GET', 'https://my.api.mockaroo.com/users.json?key=47a96010').then((response) => {
      pageTag.tagAplicacion(cy)
      pageTag.tagAplicacionCrear(cy, response.body[0].nameTag, response.body[0].color.substring(1,7),response.body[0].slug,response.body[0].description," ",response.body[0].meta_description.substring(0,153),response.body[0].canonical_url)      
     cy.wait(1000)
    cy.screenshot('Escenario 12 Prueba Positiva, crear un tag ingresando el campo meta title  vacio')
    cy.contains("Saved").should("be.visible");
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
  })
})

  it(`Escenario 13, Prueba Positiva. Ingresar a la aplicación, se dirige hasta el modulo de tag. crear un tag dejando el campo meta description vacio`, () => {
    cy.request('GET', 'https://my.api.mockaroo.com/users.json?key=47a96010').then((response) => {
      pageTag.tagAplicacion(cy)
      pageTag.tagAplicacionCrear(cy, response.body[0].nameTag, response.body[0].color.substring(1,7),response.body[0].slug,response.body[0].description,response.body[0].meta_title," ",response.body[0].canonical_url)      
    cy.wait(1000)
       cy.screenshot('Escenario 9 Prueba Positiva, crear un tag ingresando el campo meta description  vacio')
      cy.contains("Saved").should("be.visible");
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
  })
})

  it(`Escenario 14, Prueba positiva Ingresar a la aplicación, se dirige hasta el modulo de tag. crear un tag dejando el campo canonical url vacio`, () => {
    pageTag.tagAplicacion(cy)
    pageTag.tagAplicacionCrear(cy, json[13].tag_name,json[13].color,json[13].slug,json[13].description,json[13].meta_title,json[13].meta_description,json[13].canonical_url)
    cy.wait(1000)
    cy.screenshot('Escenario 14 Prueba positiva, crear un tag ingresando el campo canonical url  vacio')
      cy.contains("Retry").should("be.visible");
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy) 
    })

    it(`Escenario 15. prueba Positiva Crear un tag con registro en name limite a 191 caracteres`, () => {
      
      nameTag = faker.lorem.paragraphs()+faker.lorem.paragraphs();
      console.log("cadena antes"+nameTag);
      color = "111111 ";
      slug = " ";
      description= faker.lorem.sentence();
      meta_title= faker.name.jobType();
      meta_description = faker.lorem.sentence();
      canonical_url =faker.internet.url();
      pageTag.tagAplicacion(cy);
      pageTag.tagAplicacionCrear(cy, nameTag.substring(0,190), color, slug,description,meta_title,meta_description,canonical_url)
      cy.screenshot(`Escenario 15 Prueba positiva Crear un tag con registro en name limite a 191 caracteres`);
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
    });

    it(`Escenario 16 Prueba Negativa. Crear un tag con registro en name limite a 192 caracteres`, () => {

      nameTag = faker.lorem.paragraphs()+faker.lorem.paragraphs();
      color = "111111 ";
      slug = " ";
      description= faker.lorem.sentence();
      meta_title= faker.name.jobType();
      meta_description = faker.lorem.sentence();
      canonical_url =faker.internet.url();
      pageTag.tagAplicacion(cy);
      pageTag.tagAplicacionCrear(cy, nameTag.substring(0,193), color, slug,description,meta_title,meta_description,canonical_url)
      cy.screenshot(`Escenario 35 Prueba Negativa Crear un tag con registro en name limite a 193 caracteres`);
       pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
    });

    it(`Escenario 17. prueba Positiva Crear un tag con registro en description limite a 500 caracteres`, () => {
      
      nameTag = faker.name.jobType();
      color = "111111 ";
      slug = faker.name.jobType();
      description= faker.lorem.paragraphs()+faker.lorem.paragraphs();
      meta_title= faker.name.jobType();
      meta_description = faker.lorem.sentence();
      canonical_url =faker.internet.url();
      pageTag.tagAplicacion(cy);
      pageTag.tagAplicacionCrear(cy, nameTag, color, slug,description.substring(0,500),meta_title,meta_description,canonical_url)
      cy.screenshot(`Escenario 17 Prueba positiva Crear un tag con registro en description limite a 500 caracteres`);
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
    });

    it(`Escenario 18 Prueba Negativa. Crear un tag con registro en description limite a 501 caracteres`, () => {

      nameTag =faker.name.jobType();
      color = "111111 ";
      slug = faker.name.jobType();
      description= faker.lorem.paragraphs()+faker.lorem.paragraphs();
      meta_title= faker.name.jobType();
      meta_description = faker.lorem.sentence();
      canonical_url =faker.internet.url();
      pageTag.tagAplicacion(cy);
      pageTag.tagAplicacionCrear(cy, nameTag, color, slug,description.substring(0,501),meta_title,meta_description,canonical_url)
      cy.screenshot(`Escenario 18 Prueba Negativa Crear un tag con registro en description limite a 5001 caracteres`);
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
    });

    it(`Escenario 19. prueba Positiva Crear un tag con registro en meta_title limite a 300 caracteres`, () => {
      
      nameTag = faker.name.jobType();
      color = "111111 ";
      slug = faker.name.jobType();
      description=faker.lorem.sentence();
      meta_title=  faker.lorem.paragraphs()+faker.lorem.paragraphs();
      meta_description = faker.lorem.sentence();
      canonical_url =faker.internet.url();
      pageTag.tagAplicacion(cy);
      pageTag.tagAplicacionCrear(cy, nameTag, color, slug,description,meta_title.substring(0,300),meta_description,canonical_url)
      cy.screenshot(`Escenario 19 Prueba positiva Crear un tag con registro en meta_title limite a 300 caracteres`);
       pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
    });

    it(`Escenario 20 Prueba Negativa. Crear un tag con registro en meta_title limite a 301 caracteres`, () => {

      nameTag =faker.name.jobType();
      color = "111111 ";
      slug = faker.name.jobType();
      description= faker.lorem.sentence();
      meta_title= faker.lorem.paragraphs()+faker.lorem.paragraphs()+faker.lorem.paragraphs()+faker.lorem.paragraphs();
      meta_description = faker.lorem.sentence();
      canonical_url =faker.internet.url();
      pageTag.tagAplicacion(cy);
      pageTag.tagAplicacionCrear(cy, nameTag, color, slug,description,meta_title.substring(0,301),meta_description,canonical_url)
      cy.screenshot(`Escenario 20 Prueba Negativa Crear un tag con registro en meta_title limite a 3001 caracteres`);
       pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy)
    });

      it(`Escenario 21, Prueba Negativa Ingresar a la aplicación, se dirige hasta el modulo de tag. crear un tag ingresando el campo canonical url incorrecta`, () => {
    pageTag.tagAplicacion(cy)
    pageTag.tagAplicacionCrear(cy, json[14].tag_name,json[14].color,json[14].slug,json[14].description,json[14].meta_title,json[14].meta_description,json[14].canonical_url)
    cy.wait(1000)
    cy.screenshot('Escenario 21 Prueba positiva, crear un tag ingresando el campo canonical url  incorrecta')
      cy.contains("Retry").should("be.visible");
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy) 
    })

    it(`Escenario 22, Prueba Positiva Ingresar a la aplicación, se dirige hasta el modulo de tag. crear un tag ingresando el campo  name, slug y color los demas vacios`, () => {
      pageTag.tagAplicacion(cy)
      pageTag.tagAplicacionCrear(cy, json[15].tag_name,json[15].color,json[15].slug,json[15].description,json[15].meta_title,json[15].meta_description,json[15].canonical_url)
      cy.wait(1000)
      cy.screenshot('Escenario 22 Prueba positiva, crear un tag ingresando el campo name, slug, canonical_url y color')
        cy.contains("Saved").should("be.visible");
        pageMenuLeftAplicacion.clicAvatar(cy)
        pageMenuLeftAplicacion.clicSignOut(cy) 
      })
      
      it(`Escenario 23, Prueba Positiva Ingresar a la aplicación, se dirige hasta el modulo de tag. crear un tag ingresando el campo name, slug, color y meta_title`, () => {
    pageTag.tagAplicacion(cy)
    pageTag.tagAplicacionCrear(cy, json[16].tag_name,json[16].color,json[16].slug,json[16].description,json[16].meta_title,json[16].meta_description,json[16].canonical_url)
    cy.wait(1000)
    cy.screenshot('Escenario 23 Prueba positiva, crear un tag ingresando el campo name, slug,color,canonical_url y meta_title')
      cy.contains("Saved").should("be.visible");
      pageMenuLeftAplicacion.clicAvatar(cy)
      pageMenuLeftAplicacion.clicSignOut(cy) 
    })

    it(`Escenario 24, Prueba Positiva Ingresar a la aplicación, se dirige hasta el modulo de tag. crear un tag ingresando el campo name, slug, color y meta_descripcion`, () => {
      pageTag.tagAplicacion(cy)
      pageTag.tagAplicacionCrear(cy, json[17].tag_name,json[17].color,json[17].slug,json[17].description,json[17].meta_title,json[17].meta_description,json[17].canonical_url)
      cy.wait(1000)
      cy.screenshot('Escenario 24 Prueba positiva, crear un tag ingresando el campo name, slug, color, canonical_url y meta_descripcion')
        cy.contains("Saved").should("be.visible");
        pageMenuLeftAplicacion.clicAvatar(cy)
        pageMenuLeftAplicacion.clicSignOut(cy) 
      })
      
      it(`Escenario 25, Prueba Positiva Ingresar a la aplicación, se dirige hasta el modulo de tag. crear un tag ingresando el campo  name, slug, color y description los demas vacios`, () => {
        pageTag.tagAplicacion(cy)
        pageTag.tagAplicacionCrear(cy, json[18].tag_name,json[18].color,json[18].slug,json[18].description,json[18].meta_title,json[18].meta_description,json[18].canonical_url)
        cy.wait(1000)
        cy.screenshot('Escenario 22 Prueba positiva, crear un tag ingresando el campo name, slug, color, canonical_url, description')
          cy.contains("Saved").should("be.visible");
          pageMenuLeftAplicacion.clicAvatar(cy)
          pageMenuLeftAplicacion.clicSignOut(cy) 
        })
      
    
     afterEach(() => {
      
    });
  })