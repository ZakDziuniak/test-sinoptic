import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents,
    baseUrl: "https://ua.sinoptik.ua",
    defaultCommandTimeout: 30000,
    requestTimeout: 30000,
    responseTimeout: 30000,
    watchForFileChanges: false,
    specPattern: "**/*.cy.ts",
    videoCompression: false,
    videoUploadOnPasses: false,
    video: false,
    chromeWebSecurity: false,
    modifyObstructiveCode: false,
  },
});

let cityName: string;
async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  on("task", {
    setCity: (val) => {
      return (cityName = val);
    },
    getCity: () => {
      return cityName;
    },
  });
  return config;
}
