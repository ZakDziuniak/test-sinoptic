export default class Dashboard {
  visit() {
    cy.visit("/");
  }

  searchByCity(city: string) {
    cy.task("setCity", city);
    cy.intercept(
      "GET",
      encodeURI("https://ua.sinoptik.ua/погода-" + city.toLowerCase())
    ).as("redirect");
    cy.get("#search_city").type(city);
    cy.get(".ac_results").contains(city).click({ force: true });
    cy.location("pathname", { timeout: 10000 }).should(
      "include",
      encodeURI("/погода-" + city.toLowerCase())
    );
    cy.get("@redirect").then((resp) => {
      expect(resp.response.statusCode).to.equal(200);
    });
    cy.url().then(($url) => {
      expect(decodeURI($url)).be.equal(
        "https://ua.sinoptik.ua/погода-" + city.toLowerCase()
      );
    });
  }

  checkAllDaysData() {
    cy.task("getCity").then((city) => {
      cy.get(".main").then(($val) => {
        const length = $val.length;
        for (let i = 0; i < length; i++) {
          const date = this.currentDate(i);
          cy.intercept(
            "GET",
            encodeURI("/**/" + date + "?ajax=GetForecast")
          ).as("date");
          cy.get(".main").eq(i).click();
          cy.wait(300);
          cy.location("pathname", { timeout: 10000 }).should(
            "include",
            encodeURI("/погода-" + city.toLowerCase() + "/" + date)
          );
          if (i > 0) {
            cy.get("@date").then((resp) => {
              expect(resp.response.statusCode).to.equal(200);
            });
          }
          cy.url().then(($url) => {
            expect(decodeURI($url)).be.equal(
              "https://ua.sinoptik.ua/погода-" + city.toLowerCase() + "/" + date
            );
          });
        }
      });
    });
  }

  clickSee10Days() {
    cy.intercept("GET", encodeURI("/**/10-днів")).as("redirect");
    cy.get(".menu-item").click();
    cy.get("@redirect").then((resp) => {
      expect(resp.response.statusCode).to.equal(200);
    });
  }

  currentDate(i: number): string {
    const date = new Date();
    const currentDate = date.setHours(date.getHours() + 24 * i);
    const currentDateIso = new Date(currentDate).toISOString();
    const theDate = currentDateIso.split("T")[0];
    return theDate;
  }
}
