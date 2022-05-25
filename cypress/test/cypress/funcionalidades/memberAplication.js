



const memberAplicacion = function (cy) {
    cy.wait(5000)
    // cy.xpath("/html/body/div[2]/div/nav[1]/div/section/div[1]/ul[2]/li[4]/a").click()
    cy.xpath("/html/body/div[2]/div/nav[1]/div/section/div[1]/ul[2]/li[4]/a").click() // settings
    

    cy.wait(2000)
   
};

 

const memberAplicacionCrear = function (cy, name, email, note,label,isSubscribe) {
    
    // let datetime = new Date();
    // let day=datetime.getDay();
    cy.xpath("/html/body/div[2]/div/main/section/div/header/section/div[2]/a/span").should("be.visible").click();
    cy.wait(3000)   

    // cy.xpath("(//a[@href='#/members/'])[1]").click() // member
    cy.get('#member-name').type(name)
    cy.get('#member-email').type(email)
    cy.wait(2000)
    // cy.xpath("/html/body/div[2]/div/main/section/div[2]/form/div/section/div/div[1]/div/div[2]/div/div[1]/ul/input").should("be.visible").click()
    // cy.wait(2000)
    cy.xpath("/html/body/div[2]/div/main/section/div[2]/form/div/section/div/div[1]/div/div[2]/div/div[1]/ul/input").type(label+'{enter}').tab();


    cy.wait(2000)
    cy.get('#member-note').should('be.visible').click()
    cy.get('#member-note').type(note)

    // cy.screenshot(`Escenario21_CrearMember4_41_3_${day}`);

    
    cy.xpath("//span[contains(.,'Save')]").should("be.visible").click()

    if(isSubscribe==false){

        cy.xpath("//span[@class='input-toggle-component']").should("be.visible").click()
    
    }
    cy.wait(3000);
    // cy.xpath("//span[@class='input-toggle-component']").should("be.visible").click()
    // cy.wait(1000);
    cy.screenshot('Escenario21_crear_member')
 
    cy.xpath("/html/body/div[2]/div/main/section/div[1]/header/section/button").should("be.visible").click()
   
    cy.wait(1000);

};


const memberAplicacionBuscar = function (cy, email, esperado) {
    
    cy.get('tbody.ember-view').then(($div) => {
        if($div.length > 0) {
            for(let i = 0; i <= $div[0].children.length -1; i++) {
                if($div[0].children[i].innerText.includes(email)) {
                    return true;
                }
            }
            return false;
        }
      }).should('eq', esperado)
};


const memberAplicacionEliminar = function (cy) {
    
    if(Cypress.env('VersionEnPrueba')==1){
    cy.wait(2000)
    cy.xpath("(//a[@href='#/members/'])[1]").click() // settings

    cy.wait(3000)
    cy.get('tbody.ember-view').then(($div) => {
        if($div.length > 0) {
            return cy.xpath("/html/body/div[2]/div/main/section/section/div[1]/table/tbody/tr[1]/a[1]")
        }
      }).click()
    cy.wait(3000)

    // Click boton settings

   
    cy.xpath("/html/body/div[2]/div/main/section/div[1]/header/section/span/button").click();
    // cy.screenshot('Escenario22_DeleteMemberA')
  
    cy.wait(3000);

    
    // Click Delete Member
    cy.xpath("//span[@class='red'][contains(.,'Delete member')]").click();
    cy.wait(2000);
    // cy.screenshot('Escenario22_DeleteMemberB')
    cy.wait(5000);
           
    // Click Delete Member
    cy.xpath("(//span[contains(.,'Delete member')])[3]").click();
    cy.wait(3000);    
    }

    if(Cypress.env('VersionEnPrueba')==2){

        cy.wait(2000)
        cy.xpath("(//a[@href='#/members/'])[1]").click() // settings
    
        cy.wait(1000)
        cy.get('tbody.ember-view').then(($div) => {
            if($div.length > 0) {
                return cy.xpath(" /html/body/div[2]/div/main/section/section/div[1]/table/tbody/tr[1]/a[1]")
            }
          }).click()
        cy.wait(1000)
    
        // Click boton settings
        cy.xpath("//span[contains(.,'Save')]").click();
        cy.screenshot('Escenario22_DeleteMemberA')
        cy.wait(3000);
        
        
        // Click Delete Member
        cy.xpath("//span[contains(.,'Delete member')]").click();


    
        cy.wait(2000);
        cy.screenshot('Escenario22_DeleteMemberB')
        cy.wait(5000);
               
        // Click Delete Member
        cy.xpath("(//span[contains(.,'Delete member')])[2]").click();
        cy.wait(3000);   

    }


};


const memberAplicacionModificar = function (cy, new_name, new_email, new_note) {


    cy.wait(1000)
    cy.get('tbody.ember-view').then(($div) => {
        if($div.length > 0) {
            return cy.xpath(" /html/body/div[2]/div/main/section/section/div[1]/table/tbody/tr[1]/a[1]")
        }
      }).click()
    cy.wait(1000)
    

    // cy.xpath("(//a[@href='#/members/'])[1]").click() // member
    cy.get("#member-name").should("be.visible").clear();
    cy.get("#member-email").should("be.visible").clear();
    cy.get("#member-note").should("be.visible").clear();

    cy.get('#member-name').type(new_name)
    cy.get('#member-email').type(new_email)
    cy.get('#member-note').type(new_note)

    cy.xpath("//span[contains(.,'Save')]").should("be.visible").click()
    cy.wait(1000);

    // cy.xpath('/html/body/div[5]/div/div/div/div/div[2]/section/div/div[2]/button').click() // invitar ahora
    cy.screenshot('Ghost_' + Cypress.env('VersionEnPrueba') + '_Escenario23_Modificar_Member')
};

const memberAplicacionCrearUnsubscribe = function (cy, name, email, note) {
    
    cy.xpath("//span[contains(.,'New member')]").should("be.visible").click();
    cy.wait(1000)   

    // cy.xpath("(//a[@href='#/members/'])[1]").click() // member
    cy.get('#member-name').type(name)
    cy.get('#member-email').type(email)
    cy.get('#member-note').type(note)

    cy.xpath("//span[@class='input-toggle-component']").should("be.visible").click()
    cy.wait(3000);

    cy.screenshot('Escenario24_Create_UnsubscribeMember')
    cy.wait(1000);

    cy.xpath("//span[contains(.,'Save')]").should("be.visible").click()
    cy.wait(1000);

    // cy.xpath('/html/body/div[5]/div/div/div/div/div[2]/section/div/div[2]/button').click() // invitar ahora
};


module.exports = {
    memberAplicacion: memberAplicacion,
    memberAplicacionCrear: memberAplicacionCrear,
    memberAplicacionBuscar:memberAplicacionBuscar,
    memberAplicacionEliminar:memberAplicacionEliminar,
    memberAplicacionModificar:memberAplicacionModificar,
    memberAplicacionCrearUnsubscribe:memberAplicacionCrearUnsubscribe
};
