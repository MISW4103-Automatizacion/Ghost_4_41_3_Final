const pageStaff = function () { };

const clicInvitePeople = function (cy) { 
    cy.xpath('/html/body/div[2]/div/main/section/div/header/section/button').click()
};

const setEmailAAddress = function (cy, eMail) {
    if(eMail.length > 0) {
        cy.get('#new-user-email').type(eMail)
    }
    else {
        cy.get('#new-user-email').type('{shift}')
    }
};

const checkContributor = function (cy) { 
    if (Cypress.env('VersionEnPrueba') != 1) {
        cy.xpath('/html/body/div[4]/div/div/div/div/div[2]/section/div[1]/fieldset/div[2]/div[1]').click()
    } else {
        cy.xpath('/html/body/div[5]/div/div/div/div/div[2]/section/div/div[1]/fieldset/div[2]/div[1]').click()
    }
}

const checkAutor = function (cy) { 
    if (Cypress.env('VersionEnPrueba') != 1) {
        cy.xpath('/html/body/div[4]/div/div/div/div/div[2]/section/div[1]/fieldset/div[2]/div[2]').click()
    } else {
        cy.xpath('/html/body/div[5]/div/div/div/div/div[2]/section/div/div[1]/fieldset/div[2]/div[2]').click()
    } 
}

const checkEditor = function (cy) { 
    if (Cypress.env('VersionEnPrueba') != 1) {
        cy.xpath('/html/body/div[4]/div/div/div/div/div[2]/section/div[1]/fieldset/div[2]/div[3]').click()
    } else {
        cy.xpath('/html/body/div[5]/div/div/div/div/div[2]/section/div/div[1]/fieldset/div[2]/div[3]').click()
    } 
}

const checkAdministrador = function (cy) { 
    if (Cypress.env('VersionEnPrueba') != 1) {
        cy.xpath('/html/body/div[4]/div/div/div/div/div[2]/section/div[1]/fieldset/div[2]/div[4]').click()
    } else {
        cy.xpath('/html/body/div[5]/div/div/div/div/div[2]/section/div/div[1]/fieldset/div[2]/div[4]').click()    
    } 
}

const clicSendInvitationNow = function (cy) { 
    if (Cypress.env('VersionEnPrueba') != 1) {
        cy.xpath('/html/body/div[4]/div/div/div/div/div[2]/section/div[2]/button').click()
    } else {
        cy.xpath('/html/body/div[5]/div/div/div/div/div[2]/section/div/div[2]/button').click()
    }
}

const clicRevokeStaff = function (cy, eMail) { 
    if(eMail.length > 0) { 
        cy.get('div.apps-grid').then(($div) => {
            if($div.length > 0) {
                for(let i = 0; i <= $div[0].children.length -1; i++) {   
                    if($div[0].children[i].innerText.includes(eMail)) {
                        if($div[0].children[i].getElementsByTagName('article').length > 0){
                            if($div[0].children[i].getElementsByTagName('article')[0].querySelectorAll('a.apps-configured-action.red-hover')[0].innerText == 'REVOKE') {
                                return $div[0].children[i].getElementsByTagName('article')[0].querySelectorAll('a.apps-configured-action.red-hover')[0]
                            }
                        }
                    }
                }
            }
        }).click()
    }
}

const validarIntitedUser = function (cy, eMail, valorEsperado) {
    if(eMail.length > 0) {
        cy.get('div.apps-grid').then(($div) => {
            if($div.length > 0) {
                for(let i = 0; i <= $div[0].children.length -1; i++) {
                    if($div[0].children[i].innerText.includes(eMail)) {
                        return true;
                    }
                }
                return false;
            }
          }).should('eq', valorEsperado)
    }
}

const mensajeValidacionError = function (cy, valorEsperado) {
    cy.wait(3000)
    cy.xpath('/html/body/div[5]/div/div/div/div/div[2]/section/div/div[1]/fieldset/div[1]/p').then(($mensaje) => {
        if($mensaje.length > 0) {
            return $mensaje[0].innerText
        }
      }).should('contain', valorEsperado)
};
module.exports = { pageStaff: pageStaff, clicInvitePeople, setEmailAAddress, checkContributor, clicSendInvitationNow, validarIntitedUser, checkAutor, checkEditor, checkAdministrador, clicRevokeStaff, mensajeValidacionError };