import {
  ICheckAllDaysDate,
  IClickSeeByTenDays,
  IOpenDashboard,
  ISearchByCity,
} from "../../step_definitions/dashboard";
import { IBlockAllSpamRequests } from "../../step_definitions/requests";

describe("Test sinoptic.ua", () => {
  beforeEach(() => {
    IBlockAllSpamRequests();
  });
  it("Test weather for Київ", () => {
    const city = "Київ";
    IOpenDashboard();
    ISearchByCity(city);
    ICheckAllDaysDate();
    IClickSeeByTenDays();
    ICheckAllDaysDate();
  });
  it("Test weather for Вишгород", () => {
    const city = "Вишгород";
    IOpenDashboard();
    ISearchByCity(city);
    ICheckAllDaysDate();
    IClickSeeByTenDays();
    ICheckAllDaysDate();
  });
});
