const pageLogin = function () { };

const eMail = function (cy, valor) {
    if(valor.length > 0)
        cy.get('#ember7').type(valor)
};

const password = function (cy, password) {
    if(password.length > 0)
        cy.get('#ember9').type(password)
};

const clicSignIn = function (cy) { 
    cy.get('#ember11').click()
};

const clicForgotUser = function (cy) { 
    cy.xpath('/html/body/div[2]/div/main/div/div/section/form/div[2]/span/button').click()
};

const mensajeValidacionError = function (cy, val, valorEsperado) {
    cy.wait(3000)
    cy.xpath('/html/body/div[2]/div/main/div/div/section/p').then(($mensaje) => {
        if($mensaje.length > 0) {
            return $mensaje[0].innerText
        }
      }).should(val, valorEsperado)
};
module.exports = { pageLogin: pageLogin, eMail, password, clicSignIn, clicForgotUser, mensajeValidacionError };