import Dashboard from "../support/page_objects/dashboard";

const dashboard = new Dashboard();
export function IOpenDashboard() {
  dashboard.visit();
}

export function ISearchByCity(city: string) {
  dashboard.searchByCity(city);
}

export function ICheckAllDaysDate() {
  dashboard.checkAllDaysData();
}

export function IClickSeeByTenDays() {
  dashboard.clickSee10Days();
}
