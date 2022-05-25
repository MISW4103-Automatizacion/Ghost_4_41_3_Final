const postAplicacionCrearPost = function(cy, title, body) {
    if (title.length==0){
        cy.xpath('/html/body/div[2]/div/main/div/section/div[1]/div[1]/textarea').type(' ');
        cy.xpath('/html/body/div[2]/div/main/div/section/div[1]/div[1]/textarea').clear();
    }else {
        cy.xpath('/html/body/div[2]/div/main/div/section/div[1]/div[1]/textarea').type(title);
    }
    if (body.length == 0){
        cy.xpath('/html/body/div[2]/div/main/div/section/div[1]/div[1]/article/div[1]/div').type(' ');
        cy.wait(1000)
        cy.xpath('/html/body/div[2]/div/main/div/section/div[1]/div[1]/article/div[1]/div').clear()
    }else {
    cy.xpath('/html/body/div[2]/div/main/div/section/div[1]/div[1]/article/div[1]/div').type(body);
    }
    cy.wait(1000);
};

const postAplicacionModificarPost = function (cy, title, body) {
    cy.xpath('/html/body/div[2]/div/main/div/section/div[1]/div[1]/textarea').clear();
    cy.xpath('/html/body/div[2]/div/main/div/section/div[1]/div[1]/article/div[1]/div').clear();
    postAplicacionCrearPost(cy, title, body);
};

const postAplicacionNuevoPost = function(cy) {
    cy.wait(1000);
    cy.xpath('/html/body/div[2]/div/nav[1]/div/section/div[1]/ul[2]/li[1]/a[2]').click();
    cy.wait(1000);
};

const postAplicacionPublicar = function (cy) {
    cy.xpath('/html/body/div[2]/div/main/div/section/header/section/div[2]/div[1]').click();
    cy.xpath('/html/body/div[1]/div/footer/button[2]').click();
    cy.wait(1000);
    if (Cypress.env('VersionEnPrueba')==1){
        cy.xpath('/html/body/div[5]/div/div/div[2]/button[2]').click();
    } else {
        cy.xpath('/html/body/div[4]/div/div/div[2]/button[2]').click();
    }
    cy.wait(8000);
};

const postAplicacionPosts = function(cy) {
    cy.wait(4000);
    if (Cypress.env('VersionEnPrueba')==1){
        cy.xpath('/html/body/div[2]/div/nav[1]/div/section/div[1]/ul[2]/li[1]/div/div/ul/li[3]').click();
    } else {
        cy.xpath('/html/body/div[2]/div/nav[1]/div/section/div[1]/ul[2]/li[1]/a[1]').click();
    }
    cy.wait(1000);
}

const postAplicacionComprobarAlerta = function(cy) {
    cy.get('.gh-alert-red').should('exist');
}

const postAplicacionNoBotonPost = function(cy) {
    cy.xpath('/html/body/div[2]/div/main/div/section/header/section/div[2]/div[1]').should('not.exist');
}

const postAplicacionEliminar = function(cy) {
    cy.xpath('/html/body/div[2]/div/main/button').click();
    cy.xpath('/html/body/div[2]/div/main/div/div/div/div/div[2]/form/button').click();
    if (Cypress.env('VersionEnPrueba')==1){
        cy.xpath('html/body/div[5]/div/div/div[2]/button[2]').click();
    } else {
        cy.xpath('/html/body/div[4]/div/div/div[2]/button[2]').click();
    }
    cy.wait(2000);
};

const postAplicacionIrPrimerPost = function(cy) {
    cy.xpath('/html/body/div[2]/div/main/section/section/ol/li[2]/a[1]').click();
    cy.wait(2000);
};

const postAplicacionSalirCrearPost = function (cy) {
    cy.xpath('/html/body/div[2]/div/main/div/section/header/div/div[1]/a').click();
    cy.wait(1000)
};

const postAplicacionUpdate = function (cy) {
    cy.xpath('/html/body/div[2]/div/main/div/section/header/section/div[1]/div[1]').click();
    cy.xpath('/html/body/div[1]/div/footer/button[2]').click();
    cy.wait(8000);
};

const postAplicacionIrPaginaPublica = function (cy){
    cy.visit(Cypress.env('URLMAIN'));
    cy.wait(4000); 
}

const postAplicacionComprobarTitulo = function (cy,titulo,siExiste){
    let tituloSave='' ;
    cy.get("body").then($body => {
        if ($body.find("article").length > 0) {
            tituloSave= cy.xpath('/html/body/div[1]/div/main/div/div/article[1]/div/a/header/h2').then(
                        ($postPublicado) => {return $postPublicado[0].outerText});
        } else {
            tituloSave= cy.xpath('/html/body/div[1]/div/div/h1').then(
                ($postPublicado) => {return $postPublicado[0].outerText});
        }
        if (siExiste == true){
            return tituloSave.should('eq', titulo);
        }else{
            return tituloSave.should('not.eq',titulo)
        }  
    });
};


const postAplicacionComprobarTexto = function (cy,texto,siExiste){
    let textoSave='' ;
    cy.get("body").then($body => {
        if ($body.find("article").length > 0) {
            textoSave= cy.xpath('/html/body/div[1]/div/main/div/div/article/div/a/div/p').then(
                        ($postPublicado) => {return $postPublicado[0].outerText});
        } else {
            textoSave= cy.xpath('/html/body/div[1]/div/div/h1').then(
                ($postPublicado) => {return $postPublicado[0].outerText});
        }
        if (siExiste == true){
            return textoSave.should('eq', texto);
        }else{
            return textoSave.should('not.eq',texto)
        }  
    });
};
module.exports = {
    postAplicacionCrearPost: postAplicacionCrearPost,
    postAplicacionModificarPost: postAplicacionModificarPost,
    postAplicacionNuevoPost: postAplicacionNuevoPost,
    postAplicacionPublicar: postAplicacionPublicar,
    postAplicacionPosts: postAplicacionPosts,
    postAplicacionEliminar: postAplicacionEliminar,
    postAplicacionIrPrimerPost: postAplicacionIrPrimerPost,
    postAplicacionSalirCrearPost: postAplicacionSalirCrearPost,
    postAplicacionUpdate:postAplicacionUpdate,
    postAplicacionComprobarTitulo: postAplicacionComprobarTitulo,
    postAplicacionComprobarTexto: postAplicacionComprobarTexto,
    postAplicacionComprobarAlerta: postAplicacionComprobarAlerta,
    postAplicacionNoBotonPost: postAplicacionNoBotonPost,
    postAplicacionIrPaginaPublica: postAplicacionIrPaginaPublica
};