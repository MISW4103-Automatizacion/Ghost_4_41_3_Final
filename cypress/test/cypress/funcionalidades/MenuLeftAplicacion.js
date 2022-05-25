const pageMenuRightAplicacion = function () { };

const clicAvatar = function (cy) {
    cy.xpath('/html/body/div[2]/div/nav[1]/div/section/div[2]/div/div/div[1]/div[1]/div').click()
}

const clicSignOut = function (cy) {
    cy.xpath('/html/body/div[1]/div/ul/li[9]/a').click()
}

const clicSettings = function (cy) {
    cy.xpath('/html/body/div[2]/div/nav[1]/div/section/div[2]/div/div/div[2]/a').click()
}
module.exports = { pageMenuRightAplicacion: pageMenuRightAplicacion, clicAvatar,  clicSignOut, clicSettings};