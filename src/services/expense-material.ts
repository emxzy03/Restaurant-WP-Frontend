import http from "./axios";

function getExpenseMaterialsBy(
  startMonth: number,
  endMonth: number,
  year: string
) {
  return http.get(
    `/reports/expensematerials?startMonth=${startMonth}&endMonth=${endMonth}&year=${year}`
  );
}

function getMaterialYear() {
  return http.get("/reports/year");
}

export default { getExpenseMaterialsBy, getMaterialYear };
