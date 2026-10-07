describe('Portfolio', () => {
  it('loads the prerendered home page', () => {
    cy.visit('/');
    cy.title().should('contain', 'Fernando Pintado Ramos');
    cy.get('html').should('have.attr', 'lang', 'es');
    cy.get('h1').should('contain.text', 'Fernando').and('contain.text', 'Pintado Ramos');
    cy.get('head link[rel="canonical"]').should(
      'have.attr',
      'href',
      'https://fernandopinra.github.io/',
    );
    ['about', 'experience', 'projects', 'skills', 'contact'].forEach((id) =>
      cy.get(`section#${id}`).should('exist'),
    );
  });

  it('scrolls to a section from the navigation', () => {
    cy.visit('/');
    cy.get('nav').contains('a', 'Proyectos').click();
    cy.location('hash').should('eq', '#projects');
    cy.get('#projects-title').should('be.visible');
    cy.window().then((win) => {
      cy.get('#projects').should(($section) => {
        const top = $section[0].getBoundingClientRect().top;
        // Below the sticky header, near the top of the viewport.
        expect(top).to.be.within(40, win.innerHeight / 2);
      });
    });
  });

  it('filters projects and opens a project detail page', () => {
    cy.visit('/#projects');
    // The section hydrates incrementally; a click on the prerendered markup before
    // that finishes is not replayed. Angular drops `jsaction` once it is hydrated.
    cy.get('.filters button').should('not.have.attr', 'jsaction');
    cy.get('.filters')
      .contains('button', 'Python')
      .click()
      .should('have.attr', 'aria-pressed', 'true');
    cy.get('app-project-card').should('have.length', 1);

    cy.get('app-project-card').contains('a', 'Ver detalle').click();
    cy.location('pathname').should('eq', '/proyectos/gojo-simulator');
    cy.get('h1').should('have.text', 'Gojo Simulator');
    cy.title().should('contain', 'Gojo Simulator');

    cy.contains('a', 'Todos los proyectos').click();
    cy.location('pathname').should('eq', '/');
    cy.location('hash').should('eq', '#projects');
  });

  it('switches language, keeps the page and remembers the choice', () => {
    cy.visit('/proyectos/gojo-simulator');
    cy.get('a.lang').should('contain.text', 'EN').click();

    cy.location('pathname').should('eq', '/en/projects/gojo-simulator');
    cy.get('html').should('have.attr', 'lang', 'en');
    cy.contains('a', 'All projects').should('be.visible');
    cy.title().should('contain', 'Projects by');

    // A returning visitor lands on the language they picked.
    cy.visit('/');
    cy.location('pathname').should('eq', '/en/');
    cy.get('#about-title').should('have.text', 'About me');

    cy.get('a.lang').click();
    cy.location('pathname').should('eq', '/');
    // After client-side navigation, deferred sections load when scrolled into view.
    cy.get('#about').scrollIntoView();
    cy.get('#about-title').should('have.text', 'Sobre mí');
  });

  it('toggles and remembers the colour theme', () => {
    cy.visit('/', {
      onBeforeLoad: (win) =>
        cy
          .stub(win, 'matchMedia')
          .returns({ matches: false, addEventListener() {}, removeEventListener() {} }),
    });
    cy.get('button.theme').click();
    cy.get('html').should('have.attr', 'data-theme', 'dark');
    cy.reload();
    cy.get('html').should('have.attr', 'data-theme', 'dark');
  });

  it('shows the 404 page for unknown URLs', () => {
    cy.visit('/no-existe', { failOnStatusCode: false });
    cy.get('h1').should('have.text', 'Esta página no existe');
    cy.get('meta[name="robots"]').should('have.attr', 'content', 'noindex');
    cy.contains('a', 'Volver al inicio').click();
    cy.location('pathname').should('eq', '/');
  });
});
