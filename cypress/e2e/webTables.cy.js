/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;
  
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables')
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should have the ability pagination', () => {
    cy.get('.-pagination').should('contain', 'Previous')
      .and('contain', 'Next');
    cy.contains('.-pageInfo', 'Page').should('exist');
  });

  it('should have the ability select rows count', () => {
    cy.get('select[aria-label="rows per page"]').select('25 rows');
    cy.get('.rt-tr-group', ).should('have.length', 25);
  });

  it('should have the ability add a new worker', () => {
    cy.createWorker(user);
      cy.get('.rt-tbody').should('contain', user.firstName);
      cy.get('.rt-tbody').should('contain', user.lastName);
      cy.get('.rt-tbody').should('contain', user.email);
      cy.get('.rt-tbody').should('contain', user.age);
      cy.get('.rt-tbody').should('contain', user.salary);
      cy.get('.rt-tbody').should('contain', user.department);
  });

  it('should have the ability to delete a worker', () => {
    cy.get('#delete-record-3').click();
  });

  it('should have the ability to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
  });

  it('should have the ability find a worker and edit it', () => {
    cy.findById('searchBox').type('Kierra');
    cy.get('#edit-record-3').click();
    cy.get('#firstName').clear()
      .type(user.firstName);
    cy.get('#lastName').clear()
      .type(user.lastName);
    cy.get('#userEmail').clear()
      .type(user.email);
    cy.get('#age').clear()
      .type(user.age);
    cy.get('#salary').clear()
      .type(user.salary);
    cy.get('#department').clear()
      .type(user.department);
    cy.get('#submit').click();
    cy.findById('searchBox').clear();

    cy.get('.rt-tbody').should('contain', user.firstName);
    cy.get('.rt-tbody').should('contain', user.lastName);
    cy.get('.rt-tbody').should('contain', user.email);
    cy.get('.rt-tbody').should('contain', user.age);
    cy.get('.rt-tbody').should('contain', user.salary);
    cy.get('.rt-tbody').should('contain', user.department);
  });

  it('should have the ability search by all column values', () => {
    cy.createWorker(user);
    cy.findById('searchBox').type(user.firstName);
    cy.findById('searchBox').clear().type(user.lastName);
    cy.findById('searchBox').clear().type(user.email);
    cy.findById('searchBox').clear().type(user.age);
    cy.findById('searchBox').clear().type(user.salary);
    cy.findById('searchBox').clear().type(user.department);
  });
});
