const pageTag = function () { };

const tagAplicacion = function (cy) {
    cy.wait(1000)
    cy.xpath('/html/body/div[2]/div/nav[1]/div/section/div[1]/ul[2]/li[3]/a').click() // tag
    cy.wait(1000)
    cy.xpath('/html/body/div[2]/div/main/section/div/header/h2').should('contain', 'Tags')
    cy.wait(1000)
};

const tagAplicacionBuscar = function (cy, nameTag, nameTagEsperado) {
    cy.xpath('/html/body/div[2]/div/main/section/section/ol').then(($div) => {
        if($div.length > 0) {
            for(let i = 0; i <= $div[0].children.length -1; i++) {
                if($div[0].children[i].innerText.includes(nameTag)) {
                    return true;
                }
            }
            return false;
        }
      })
};

const tagAplicacionCrear = function (cy, nameTag,color,slug,description,meta_title,meta_description,canonical_url) {
    console.log("cadena despues"+nameTag);
    cy.xpath('/html/body/div[2]/div/main/section/div/header/section/a').click() // NewTag
    cy.wait(1000)
    cy.get('#tag-name').type(nameTag)
    cy.xpath('/html/body/div[2]/div/main/section/form/div[2]/div/section/div/div[1]/div[1]/div[2]/div/input').type(color);
    cy.get('#tag-slug').type(slug)
    cy.get('#tag-description').type(description)
    cy.xpath('/html/body/div[2]/div/main/section/form/div[2]/section/div[1]/div[1]/button/span').click()
    cy.get('#meta-title').type(meta_title)
    cy.get('#meta-description').type(meta_description)
    cy.get('#canonical-url').type(canonical_url)
     cy.wait(1000)
    cy.xpath('/html/body/div[2]/div/main/section/form/div[1]/header/section/button/span').click() // Save
}

const tagAplicacionEliminar = function (cy, nameTag) {
    cy.wait(5000)
    if (Cypress.env('VersionEnPrueba') == 1) {
        cy.xpath('/html/body/div[2]/div/main/section/section/ol/li[2]/a[1]/h3').click() // Primer tag creado
    } else {
        cy.xpath('/html/body/div[2]/div/main/section/section/ol/li[3]/a[1]/h3').click()
    } 
    cy.wait(5000)
    cy.xpath('/html/body/div[2]/div/main/section/div/button/span').click() //Delete tag
    cy.wait(5000)
    if (Cypress.env('VersionEnPrueba') == 1) {
        cy.xpath('/html/body/div[5]/div/div/div/div/div[2]/section/div[2]/button[2]/span').click() // Delete
    } else {
        cy.xpath('/html/body/div[4]/div/div/div/div/div[2]/section/div[2]/button[2]/span').click()
    } 
}

const tagAplicacionModificar = function (cy, nameTag) {
    if (Cypress.env('VersionEnPrueba') == 1) {
        cy.xpath('/html/body/div[2]/div/main/section/section/ol/li[2]/a[1]/h3').click() // Primer tag creado
    } else {
        cy.xpath('/html/body/div[2]/div/main/section/section/ol/li[3]/a[1]/h3').click()
    } 
    cy.wait(1000)
    cy.get('#tag-name').type(nameTag)
    cy.xpath('/html/body/div[2]/div/main/section/form/div[1]/header/section/button/span').click() // Save
}

module.exports = {pageTag: pageTag, tagAplicacion, tagAplicacionBuscar, tagAplicacionCrear, tagAplicacionEliminar, tagAplicacionModificar};