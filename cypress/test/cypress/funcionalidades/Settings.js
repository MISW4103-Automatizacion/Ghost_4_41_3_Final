const pageSettings = function () { };

const clicStaff= function (cy) {
    cy.xpath('/html/body/div[2]/div/main/section/section/div[2]/a[4]').click()
}

module.exports = { pageSettings: pageSettings, clicStaff };