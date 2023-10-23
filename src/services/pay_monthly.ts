import http from "./axios";

function getSalaryEsBy(startMonth: number, endMonth: number, year: string) {
  return http.get(
    `/reports/sarary?startMonth=${startMonth}&endMonth=${endMonth}&year=${year}`
  );
}
function getSararyYear() {
  return http.get("/reports/year");
}

export default { getSalaryEsBy, getSararyYear };
