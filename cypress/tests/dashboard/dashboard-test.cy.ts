import { IOpenDashboard, ISearchByCity } from "../../step_definitions/dashboard";

describe("Test sinoptic.ua", () => {
  it("First test", () => {
    cy.intercept("https://ghb.adtelligent.com/**", {statusCode:200})
    cy.intercept("https://stats.g.doubleclick.net/**", {statusCode:200})
    cy.intercept("https://ghb.adtelligent.com/**", {statusCode:200})
    cy.intercept("https://securepubads.g.doubleclick.net/**", {statusCode:200})
    IOpenDashboard();
    ISearchByCity("Київ")
  });
});

