describe("Ingresar a la aplicacion, si el usuario no existe se crea. Se dirige al modulo Member. Crear un member y validar que aparezca en la lista de members, sale de la aplicacion.", () => {
  const registerUser = require("../funcionalidades/registrarUsuario");
  const pageLogin = require("../funcionalidades/Login");
  const pageMenuLeftAplicacion = require("../funcionalidades/MenuLeftAplicacion");
  const datos = require("../datos/login.json");
  const memberAplicacion = require("../funcionalidades/memberAplication");

  let membersJson = require("../datos/dataPoolMemberFull.json");

  const { faker } = require("@faker-js/faker");
  let mail;
  let note;
  let name;

  let label;

  let isSubscribe;
  let email;
  let e_mail;

  let new_mail;
  let new_note;
  let new_name;
  let short_email;


  // Uso de Mockaroo para  la data en tiempo de ejecución


  beforeEach(() => {
    cy.clearCookies();
    cy.visit("/");

    cy.get("main").then(($main) => {
      if ($main.find("form").length > 0) {
        if ($main.find("form")[0].id == "setup") {
          cy.screenshot("Escenario01_registrarUsuario_ ");
          registerUser.registerUser(
            cy,
            Cypress.env("NAMEBLOG"),
            Cypress.env("FULLNAME"),
            Cypress.env("USER"),
            Cypress.env("PASSWORD")
          );
          cy.wait(3000);
          pageMenuLeftAplicacion.clicAvatar(cy);
          cy.wait(1000)
          pageMenuLeftAplicacion.clicSignOut(cy);
        }
      }
    });

    pageLogin.eMail(cy, datos.EmailValido);
    pageLogin.password(cy, datos.PasswordValido);
    pageLogin.clicSignIn(cy);
    cy.wait(5000);

    if (Cypress.env("isRegresionVisual") == false) {
      email = faker.internet.email();
    } else {
      email = "pruebaRegresion@regresion.com.co";
    }
  });

  it(`Escenario 1 - Crear un member`, () => {



    if (Cypress.env("isRegresionVisual") != true) {
      mail = faker.internet.email();
      name = faker.name.findName();
      label = faker.company.bs();
      note = faker.company.bs();
    } else {
      mail = "pruebaRegresion_member@regresion.com.co";
      name = "PruebaMemberUser";
      label = "Label";
      note = "Prueba notas usuario";
    }

    cy.request('https://my.api.mockaroo.com/data_pool_members.json?key=dc2a1da0')

    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(cy, name, mail, note, label, true);
    cy.screenshot(`Escenario 1 Prueba Positiva crear member`);
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionBuscar(cy, mail, true);
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionEliminar(cy);
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)
  });

  it(`Escenario 2 Crear un member con campo vacios`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[0].name,
      membersJson[0].email,
      membersJson[0].note,
      membersJson[0].label,
      membersJson[0].isSubscribe
    );
    cy.screenshot(
      `Escenario 2 Prueba Negativa Crear un member con campos vacios`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)
  });

  it(`Escenario 3 Crear un member con subscribe inactivo sin datos (nombre, email.label y note)`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[1].name,
      membersJson[1].email,
      membersJson[1].note,
      membersJson[1].label,
      membersJson[1].isSubscribe
    );
    cy.screenshot(
      `Escenario 3 Prueba Negativa Crear un member con subscribe inactivo sin datos (nombre, email.label y note)`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 4 Crear un member con registro en campo name, Subscribe inactivo, email vacío`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[2].name,
      membersJson[2].email,
      membersJson[2].note,
      membersJson[2].label,
      membersJson[2].isSubscribe
    );
    cy.screenshot(
      `Escenario 4 Prueba Negativa Crear un member con registro en campo name Subscribe inactivo email vacío`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 5 Crear un member con registro en campo label y Subscribe inactivo, email vacío`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[3].name,
      membersJson[3].email,
      membersJson[3].note,
      membersJson[3].label,
      membersJson[3].isSubscribe
    );
    cy.screenshot(
      `Escenario 5 Prueba Negativa Crear un member con registro en campo label y Subscribe inactivo email vacío`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 6 Crear un member con registro en campo note y Subscribe inactivo, email vacío`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[4].name,
      membersJson[4].email,
      membersJson[4].note,
      membersJson[4].label,
      membersJson[4].isSubscribe
    );
    cy.screenshot(
      `Escenario 6 Prueba Negativa Crear un member con registro en campo note y Subscribe inactivo email vacío`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 7 Crear un member con registro en campo name, label y Subscribe inactivo, note vacio, email vacío`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[5].name,
      membersJson[5].email,
      membersJson[5].note,
      membersJson[5].label,
      membersJson[5].isSubscribe
    );
    cy.screenshot(
      `Escenario 7 Prueba Negativa Crear un member con registro en campo name label y Subscribe inactivo note vacio email vacío`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 8 Crear un member con registro en campo label,note y Subscribe inactivo, name vacio, email vacío`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[6].name,
      membersJson[6].email,
      membersJson[6].note,
      membersJson[6].label,
      membersJson[6].isSubscribe
    );
    cy.screenshot(
      `Escenario 8 Prueba Negativa Crear un member con registro en campo name label note y Subscribe inactivo name vacio email vacío`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 9 Crear un member con registro en campo name,note y Subscribe inactivo, label vacio, email vacío`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[7].name,
      membersJson[7].email,
      membersJson[7].note,
      membersJson[7].label,
      membersJson[7].isSubscribe
    );
    cy.screenshot(
      `Escenario 9 Prueba Negativa Crear un member con registro en campo name note y Subscribe inactivo label vacio email vacío`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });


  
  it(`Escenario 10 Crear un member con registro en campo name(incorrecto),label, note y Subscribe inactivo, email vacío`, () => {
    cy.request(
      "GET",
      "https://my.api.mockaroo.com/users.json?key=47a96010"
    ).then((response) => {
   

  
      memberAplicacion.memberAplicacion(cy);
      memberAplicacion.memberAplicacionCrear(
        cy,
        response.body[0].badText,
        " ",
        response.body[0].note,
        response.body[0].label,
        false
      );
      cy.screenshot(
        `Escenario 10 Prueba Negativa Crear un member con registro en campo name(incorrecto)label note y Subscribe inactivo email vacío`
      );
      cy.wait(3000);
      pageMenuLeftAplicacion.clicAvatar(cy);
      cy.wait(1000);
      pageMenuLeftAplicacion.clicSignOut(cy);
      cy.wait(1000);
    });
  });




  it(`Escenario 11 Crear un member con registro solamente en campo name y Subscribe inactivo`, () => {
    cy.request(
      "GET",
      "https://my.api.mockaroo.com/users.json?key=47a96010"
    ).then((response) => {

        memberAplicacion.memberAplicacion(cy);
        memberAplicacion.memberAplicacionCrear(
          cy,
          response.body[0].fullName,
          " ",
          " ",
          " ",
          false
        );
        cy.screenshot(
          `Escenario 11 Prueba Negativa Crear un member con registro en campo  name y Subscribe inactivo`
        );
        cy.wait(3000);
        pageMenuLeftAplicacion.clicAvatar(cy);
        cy.wait(1000);
        pageMenuLeftAplicacion.clicSignOut(cy);
        cy.wait(1000);
      });
  });

  it(`Escenario 12 Crear un member con registro solamente en campo label y Subscribe inactivo`, () => {
    cy.request(
      "GET",
      "https://my.api.mockaroo.com/users.json?key=47a96010"
    ).then((response) => {


        memberAplicacion.memberAplicacion(cy);
        memberAplicacion.memberAplicacionCrear(
          cy,
          " ",
          " ",
          " ",
          response.body[0].label,
          false
        );
        cy.screenshot(
          `Escenario 12 Prueba Negativa Crear un member con registro en campo  label y Subscribe inactivo`
        );
        cy.wait(3000);
        pageMenuLeftAplicacion.clicAvatar(cy);
        cy.wait(1000);
        pageMenuLeftAplicacion.clicSignOut(cy);
        cy.wait(1000);
      });
  });




  it(`Escenario 13 Crear un member con registro solamente en campo note y Subscribe inactivo mail vacio`, () => {
    cy.request(
      "GET",
      "https://my.api.mockaroo.com/users.json?key=47a96010"
    ).then((response) => {
        memberAplicacion.memberAplicacion(cy);
        memberAplicacion.memberAplicacionCrear(
          cy,
          " ",
          " ",
          response.body[0].note,
          " ",
          false
        );
        cy.screenshot(
          `Escenario 13 Prueba Negativa Crear un member con registro en campo  note y Subscribe inactivo mail vacio`
        );
        cy.wait(3000);
        pageMenuLeftAplicacion.clicAvatar(cy);
        cy.wait(1000);
        pageMenuLeftAplicacion.clicSignOut(cy);
        cy.wait(1000);
      });
  });



  it(`Escenario 14 Crear un member con registro en campos name, label y Subscribe inactivo, mail vacio`, () => {
    cy.request(
      "GET",
      "https://my.api.mockaroo.com/users.json?key=47a96010"
    ).then((response) => {


    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      response.body[0].fullName,
      " ",
      response.body[0].note,
      response.body[0].label,
      false
    );
    cy.screenshot(
      `Escenario 14 Prueba Negativa Crear un member con registro en name label y Subscribe inactivo mail vacio`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  });

  it(`Escenario 15 Crear un member con registro en campos label,note y Subscribe inactivo mail vacio`, () => {

    cy.request(
      "GET",
      "https://my.api.mockaroo.com/users.json?key=47a96010"
    ).then((response) => {

    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      " ",
     " ",
     response.body[0].note,
     response.body[0].label,
      false
    );
    cy.screenshot(
      `Escenario 15 Prueba Negativa Crear un member con registro en campo label note y Subscribe inactivo mail vacio`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });
});

  it(`Escenario 16 Crear un member con registro en campos name,note y Subscribe inactivo mail vacio`, () => {
    cy.request(
      "GET",
      "https://my.api.mockaroo.com/users.json?key=47a96010"
    ).then((response) => {

    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      response.body[0].fullName,
      " ",
      response.body[0].note,
      " ",
      false
    );
    cy.screenshot(
      `Escenario 16 Prueba Negativa Crear un member con registro en campo  name note y Subscribe inactivo mail vacio`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });
});




  it(`Escenario 17 Crear un member con registro en campos name,note,label y Subscribe inactivo mail vacio`, () => {

    cy.request(
      "GET",
      "https://my.api.mockaroo.com/users.json?key=47a96010"
    ).then((response) => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      response.body[0].fullName,
      " ",
      response.body[0].note,
      response.body[0].label,
      false
    );
    cy.screenshot(
      `Escenario 17 Prueba Negativa Crear un member con registro en campo  name note label y Subscribe inactivo mail vacio`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });
});

  it(`Escenario 18 Crear un member con registro en mail (datos incorrectos) y Subscribe activo demás datos vacíos`, () => {

    cy.request(
      "GET",
      "https://my.api.mockaroo.com/users.json?key=47a96010"
    ).then((response) => {

    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      " ",
      response.body[0].fullName,
      " ",
      " ",
      true
    );
    cy.screenshot(
      `Escenario 18 Prueba Negativa Crear un member con registro en mail (datos incorrectos) y Subscribe activo demás datos vacíos`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });
});



  it(`Escenario 19 Crear un member con registro en name, mail (datos incorrectos) y Subscribe activo`, () => {
    cy.request(
      "GET",
      "https://my.api.mockaroo.com/users.json?key=47a96010"
    ).then((response) => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      response.body[0].fullName,
      response.body[0].badText,
      " ",
      " ",
      true
    );
    cy.screenshot(
      `Escenario 19 Prueba Negativa Crear un member con registro en name mail (datos incorrectos) y Subscribe activo`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });
});

  it(`Escenario 20 Crear un member con registro en label, mail (datos incorrectos) y Subscribe activo`, () => {
    cy.request(
      "GET",
      "https://my.api.mockaroo.com/users.json?key=47a96010"
    ).then((response) => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      " ",
      response.body[0].badText,
      " ",
      response.body[0].label,
      true
    );
    cy.screenshot(
      `Escenario 20 Prueba Negativa Crear un member con registro en label mail (datos incorrectos) y Subscribe activo`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });
});

  it(`Escenario 21 Crear un member con registro en note, mail (datos incorrectos) y Subscribe activo`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[19].name,
      membersJson[19].email,
      membersJson[19].note,
      membersJson[19].label,
      membersJson[19].isSubscribe
    );
    cy.screenshot(
      `Escenario 21 Prueba Negativa Crear un member con registro en note mail (datos incorrectos) y Subscribe activo`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 22  Crear un member con registro en name, label, mail (datos incorrectos) y Subscribe activo`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[20].name,
      membersJson[20].email,
      membersJson[20].note,
      membersJson[20].label,
      membersJson[20].isSubscribe
    );
    cy.screenshot(
      `Escenario 22 Prueba Negativa Crear un member con registro en name label mail (datos incorrectos) y Subscribe activo`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 23 Crear un member con registro en label, mail (datos incorrectos) y Subscribe activo`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[21].name,
      membersJson[21].email,
      membersJson[21].note,
      membersJson[21].label,
      membersJson[21].isSubscribe
    );
    cy.screenshot(
      `Escenario 23 Prueba Negativa Crear un member con registro en label mail (datos incorrectos) y Subscribe activo`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 24  Crear un member con registro en name, mail (datos incorrectos) y Subscribe activo`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[22].name,
      membersJson[22].email,
      membersJson[22].note,
      membersJson[22].label,
      membersJson[22].isSubscribe
    );
    cy.screenshot(
      `Escenario 24 Prueba Negativa Crear un member con registro en name mail (datos incorrectos) y Subscribe activo`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  // ISSUE

  it(`Escenario 25 Crear un member con registro en name,label, mail (datos incorrectos) y Subscribe activo`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[23].name,
      membersJson[23].email,
      membersJson[23].note,
      membersJson[23].label,
      membersJson[23].isSubscribe
    );
    cy.screenshot(
      `ISSUE Escenario 25 Prueba Negativa  Crear un member con registro en name label  mail (datos incorrectos) y Subscribe activo`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 26  Crear un member con registro en mail (datos incorrectos) y Subscribe activo`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[24].name,
      membersJson[24].email,
      membersJson[24].note,
      membersJson[24].label,
      membersJson[24].isSubscribe
    );
    cy.screenshot(
      `Escenario 26 Prueba Negativa Crear un member con registro en mail (datos incorrectos) y Subscribe activo`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  // // ISSUE

  it(`Escenario 27 Crear un member con registro en name, mail (datos incorrectos) y Subscribe activo`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[25].name,
      membersJson[25].email,
      membersJson[25].note,
      membersJson[25].label,
      membersJson[25].isSubscribe
    );
    cy.screenshot(
      `ISSUE Escenario 27 Prueba Negativa Crear un member con registro en name mail (datos incorrectos) y Subscribe activo`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 28  Crear un member con registro en label, mail (datos incorrectos) y Subscribe activo`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[26].name,
      membersJson[26].email,
      membersJson[26].note,
      membersJson[26].label,
      membersJson[26].isSubscribe
    );
    cy.screenshot(
      `Escenario 28 Prueba Negativa Crear un member con registro en label mail (datos incorrectos) y Subscribe activo`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  // // ISSUE

  it(`Escenario 29 Crear un member con registro en note, mail (datos incorrectos) y Subscribe activo`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[27].name,
      membersJson[27].email,
      membersJson[27].note,
      membersJson[27].label,
      membersJson[27].isSubscribe
    );
    cy.screenshot(
      `ISSUE Escenario 29 Prueba Negativa Crear un member con registro en note mail (datos incorrectos) y Subscribe activo`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 30 Crear un member con registro en name,label mail (datos incorrectos) y Subscribe activo`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[28].name,
      membersJson[28].email,
      membersJson[28].note,
      membersJson[28].label,
      membersJson[28].isSubscribe
    );
    cy.screenshot(
      `Escenario 30 Prueba Negativa Crear un member con registro en name label mail (datos incorrectos) y Subscribe activo`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 31 Crear un member con registro en label,note mail (datos incorrectos) y Subscribe activo`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[29].name,
      membersJson[29].email,
      membersJson[29].note,
      membersJson[29].label,
      membersJson[29].isSubscribe
    );
    cy.screenshot(
      `Escenario 31 Prueba Negativa Crear un member con registro en label note mail (datos incorrectos) y Subscribe activo`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 32 Crear un member con registro en name,note mail (datos incorrectos) y Subscribe activo`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[30].name,
      membersJson[30].email,
      membersJson[30].note,
      membersJson[30].label,
      membersJson[30].isSubscribe
    );
    cy.screenshot(
      `Escenario 32 Prueba Negativa Crear un member con registro en name note mail (datos incorrectos) y Subscribe activo`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  //ISSUE

  it(`Escenario 33 Crear un member con registro en name,label, note mail (datos incorrectos) y Subscribe activo`, () => {
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      membersJson[31].name,
      membersJson[31].email,
      membersJson[31].note,
      membersJson[31].label,
      membersJson[31].isSubscribe
    );
    cy.screenshot(
      `ISSUE Escenario 33 Prueba Negativa Crear un member con registro en name label note mail (datos incorrectos) y Subscribe activo`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 34 Crear un member con registro en name limite a 191 caracteres`, () => {
    name = faker.lorem.paragraphs();
    mail = faker.internet.email();
    label = faker.company.bs();
    note = faker.company.bs();
    isSubscribe = faker.random.boolean();
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      name.substring(0, 191),
      mail,
      note,
      label,
      isSubscribe
    );
    cy.screenshot(
      `Escenario 34 Prueba Negativa Crear un member con registro en name limite a 191 caracteres`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 35 Crear un member con registro en name limite a 192 caracteres`, () => {
    name = faker.lorem.paragraphs();
    mail = faker.internet.email();
    label = faker.company.bs();
    note = faker.company.bs();
    isSubscribe = faker.random.boolean();
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      name.substring(0, 193),
      mail,
      note,
      label,
      isSubscribe
    );
    cy.screenshot(
      `Escenario 35 Prueba Negativa Crear un member con registro en name limite a 192 caracteres`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(3000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 36 Crear un member con un registro en note limite a 500 caracteres`, () => {
    name = faker.name.findName();
    mail = faker.internet.email();
    label = faker.company.bs();
    note = faker.lorem.paragraphs();
    isSubscribe = faker.random.boolean();
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      name,
      mail,
      note.substring(0, 500),
      label,
      isSubscribe
    );
    cy.screenshot(
      `Escenario 36 Prueba Negativa Crear un member con registro en note limite a 500 caracteres`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(3000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 37 Crear un member con un registro en note limite mayor a 500 caracteres`, () => {
    name = faker.name.findName();
    mail = faker.internet.email();
    label = faker.company.bs();
    note = faker.lorem.paragraphs();
    isSubscribe = faker.random.boolean();
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      name,
      mail,
      note.substring(0, 501),
      label,
      isSubscribe
    );
    cy.screenshot(
      `Escenario 37 Prueba Negativa Crear un member con registro en note limite mayor a 501 caracteres`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 38 Crear un member con un registro en note limite a 500 caracteres y name limite a 191 caracteres`, () => {
    name = faker.lorem.paragraphs();
    mail = faker.internet.email();
    label = faker.company.bs();
    note = faker.lorem.paragraphs();
    isSubscribe = faker.random.boolean();
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      name.substring(0, 191),
      mail,
      note.substring(0, 500),
      label,
      isSubscribe
    );
    cy.screenshot(
      `Escenario 38 Prueba Negativa Crear un member con registro en note limite  a 500 caracteres y name limite a 191 caracteres`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 39 Crear un member con un registro en note mayor a 500 caracteres y name mayor a 191 caracteres`, () => {
    name = faker.lorem.paragraphs();
    mail = faker.internet.email();
    label = faker.company.bs();
    note = faker.lorem.paragraphs();
    isSubscribe = faker.random.boolean();
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      name.substring(0, 192),
      mail,
      note.substring(0, 501),
      label,
      isSubscribe
    );
    cy.screenshot(
      `Escenario 39 Prueba Negativa Crear un member con registro en note mayor  a 500 caracteres y name mayor a 191 caracteres`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 40 Crear un member con un registro en mail limite a 64 caracteres o números con dominio válido`, () => {
    name = faker.lorem.paragraphs();
    mail = faker.lorem.sentences();
    e_mail = mail.split(" ").join("");
    email = e_mail.split(".").join("");
    short_email = email.substring(0, 64);
    label = faker.company.bs();
    note = note = faker.company.bs();
    isSubscribe = faker.random.boolean();
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      name.substring(0, 191),
      short_email.concat("@dominio.com"),
      note,
      label,
      isSubscribe
    );
    cy.screenshot(
      `Escenario 40 Prueba Negativa Crear un member con registro en mail mayor a 64 caracteres o números con dominio válido`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  // ISSUE - Sale invalid email
  it(`Escenario 41 Crear un member con un registro en mail mayor a 64 caracteres o números con dominio válido`, () => {
    name = faker.lorem.paragraphs();
    mail = faker.lorem.sentences();
    e_mail = mail.split(" ").join("");
    email = e_mail.split(".").join("");
    short_email = email.substring(0, 65);
    label = faker.company.bs();
    note = note = faker.company.bs();
    isSubscribe = faker.random.boolean();
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      name.substring(0, 191),
      short_email.concat("@dominio.com"),
      note,
      label,
      isSubscribe
    );
    cy.screenshot(
      `ISSUE Escenario 41 Prueba Negativa Crear un member con registro en mail mayor a 64 caracteres o números con dominio válido`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  // ISSUE
  it(`Escenario 42 Crear un member con un registro en mail limite a 191 caracteres o números con dominio válido`, () => {
    name = faker.lorem.paragraphs();
    mail = faker.lorem.sentences();
    e_mail = mail.split(" ").join("");
    email = e_mail.split(".").join("");
    short_email = email.substring(0, 179);
    label = faker.company.bs();
    note = note = faker.company.bs();
    isSubscribe = faker.random.boolean();
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      name.substring(0, 191),
      short_email.concat("@dominio.com"),
      note,
      label,
      isSubscribe
    );
    cy.screenshot(
      `ISSUE Escenario 42 Prueba Negativa Crear un member con registro en mail limite a 191 caracteres o números con dominio válido`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it(`Escenario 43 Crear un member con un registro en mail mayor a 191 caracteres o números con dominio válido`, () => {
    name = faker.lorem.paragraphs();
    mail = faker.lorem.sentences();
    e_mail = mail.split(" ").join("");
    email = e_mail.split(".").join("");
    short_email = email.substring(0, 185);
    label = faker.company.bs();
    note = note = faker.company.bs();
    isSubscribe = faker.random.boolean();
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(
      cy,
      name.substring(0, 191),
      short_email.concat("@dominio.com"),
      note,
      label,
      isSubscribe
    );
    cy.screenshot(
      `Escenario 43 Prueba Negativa Crear un member con registro en mail mayor a 191 caracteres o números con dominio válido`
    );
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });


  //   it.only(`Escenario 44 - Eliminar un member`, () => {
  //   if (Cypress.env("isRegresionVisual") != true) {
  //     mail = faker.internet.email();
  //     name = faker.name.findName();
  //     label = faker.company.bs();
  //     note = faker.company.bs();
  //   } else {
  //     mail = "pruebaRegresion_member@regresion.com.co";
  //     name = "PruebaMemberUser";
  //     label = "Label";
  //     note = "Prueba notas usuario";
  //   }

  //   memberAplicacion.memberAplicacion(cy);
  //   memberAplicacion.memberAplicacionCrear(cy, name, mail, note, label, true);
  //   cy.screenshot(`Escenario 44 Prueba Positiva elim,inar member`);
  //   memberAplicacion.memberAplicacion(cy);
  //   memberAplicacion.memberAplicacionBuscar(cy, mail, true);
  //   memberAplicacion.memberAplicacion(cy);
  //   memberAplicacion.memberAplicacionEliminar(cy);
  //   cy.wait(3000);
  //   pageMenuLeftAplicacion.clicAvatar(cy);
  //   cy.wait(1000)
  //   pageMenuLeftAplicacion.clicSignOut(cy);
  // });


  it("Escenario 44 Modificar  un member", () => {
    if (Cypress.env("isRegresionVisual") != true) {
      mail = faker.internet.email();
      name = faker.name.findName();
      note = faker.company.bs();

      new_mail = faker.internet.email();
      new_name = faker.name.findName();
      new_note = faker.company.bs();
    } else {
      mail = "pruebaRegresion_member@regresion.com.co";
      name = "PruebaMemberUser";
      note = "Prueba notas usuario";

      new_mail = "changed_pruebaRegresion_member@regresion.com.co";
      new_name = "ChangedPruebaMemberUser";
      new_note = "Prueba notas usuario cambiado";
    }

    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrear(cy, name, mail, note);
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionModificar(
      cy,
      new_name,
      new_mail,
      new_note
    );
    cy.screenshot(`Escenario 44 Prueba Positiva modificar member`);

    // memberAplicacionBuscar.memberAplicacionBuscar(cy, mail, true)
    memberAplicacion.memberAplicacionEliminar(cy);
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });

  it("Escenario 45 crear un member unsubscribe", () => {
    if (Cypress.env("isRegresionVisual") != true) {
      mail = faker.internet.email();
      name = faker.name.findName();
      note = faker.company.bs();
    } else {
      mail = "pruebaRegresion_member@regresion.com.co";
      name = "PruebaMemberUser";
      note = "Prueba notas usuario";
    }

    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionCrearUnsubscribe(cy, name, mail, note);
    cy.screenshot(`Escenario 45 Prueba Positiva crear  member unsubscribe`);
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionBuscar(cy, mail, true);
    memberAplicacion.memberAplicacion(cy);
    memberAplicacion.memberAplicacionEliminar(cy);
    cy.wait(3000);
    pageMenuLeftAplicacion.clicAvatar(cy);
    cy.wait(1000)
    pageMenuLeftAplicacion.clicSignOut(cy);
    cy.wait(1000)

  });
});
