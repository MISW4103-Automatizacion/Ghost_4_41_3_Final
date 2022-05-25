const registerUser = function (cy, titleBlog, fullName, email, password) {
    if(Cypress.env('VersionEnPrueba') == 1) {
        cy.xpath('/html/body/div[2]/div/main/section/div/form/div[1]/span/input').type(titleBlog)
        cy.xpath('/html/body/div[2]/div/main/section/div/form/div[2]/span/input').type(fullName)
        cy.xpath('/html/body/div[2]/div/main/section/div/form/div[3]/span/input').type(email)
        cy.xpath('/html/body/div[2]/div/main/section/div/form/div[4]/span/input').type(password)
        cy.xpath('/html/body/div[2]/div/main/section/div/form/button').click()
        cy.xpath('/html/body/div[2]/div/main/div/main/div[1]/div/div/div/div/section/a[4]').click()
    } else {
        cy.xpath('/html/body/div[2]/div/main/div/div/section/form/div[2]/span/input').type(titleBlog)
        cy.xpath('/html/body/div[2]/div/main/div/div/section/form/div[3]/span/input').type(fullName)
        cy.xpath('/html/body/div[2]/div/main/div/div/section/form/div[4]/span/input').type(email)
        cy.xpath('/html/body/div[2]/div/main/div/div/section/form/div[5]/span/input').type(password)
        cy.xpath('/html/body/div[2]/div/main/div/div/section/form/button').click()
        cy.xpath('/html/body/div[2]/div/main/div/div/section/button').click()
    }
};
module.exports = { registerUser: registerUser };