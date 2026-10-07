// Every test starts without a remembered language or theme.
beforeEach(() => {
  cy.clearLocalStorage();
});

// Fail on console errors such as hydration mismatches.
Cypress.on('window:before:load', (win) => {
  cy.stub(win.console, 'error').callsFake((...args: unknown[]) => {
    throw new Error(`console.error: ${args.map(String).join(' ')}`);
  });
});
