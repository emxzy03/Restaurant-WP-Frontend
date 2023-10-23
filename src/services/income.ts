import http from "./axios";

function getIncomesBy(startMonth: number, endMonth: number, year: string) {
  return http.get(
    `/reports/incomes?startMonth=${startMonth}&endMonth=${endMonth}&year=${year}`
  );
}
export default { getIncomesBy };
