export default class Dashboard {
  visit() {
    cy.visit("/");
  }

  searchByCity(city: string) {
    cy.intercept("POST", "/api/boards").as("createBoard");
    cy.get("#search_city").type(city);
    cy.get(".ac_results").contains(city).click({ force: true });
    cy.request({ url: "https://ua.sinoptik.ua", followRedirect: false }).then((resp) => {
        expect(resp.status).to.eq(200);
      });;
    cy.url().then(($url) => {
      expect(decodeURI($url)).be.equal("https://ua.sinoptik.ua/погода-київ");
    });
  }
}
