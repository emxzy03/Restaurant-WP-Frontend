import type SalaryMgmt from "@/types/Salary";
import http from "./axios";

function getSalaryMgmts() {
  return http.get("/salarys");
}
function getSalaryYearMgmts() {
  return http.get("/salarys/year");
}
function getSalaryDate(startD: string, endD: string) {
  return http.get(`/salarys/salarydate?startD=${startD}&endD=${endD}`);
}
function getSalaryCIO(startD: string, endD: string) {
  return http.get(`/salarys/salarycio?startD=${startD}&endD=${endD}`);
}
function getOneSalaryMgmt(id: number) {
  return http.get(`/salarys/${id}`);
}

function saveSalaryMgmt(salarymgmt: SalaryMgmt) {
  return http.post("/salarys", salarymgmt);
}

function updateSalaryMgmt(id: number, salarymgmt: SalaryMgmt) {
  return http.patch(`/salarys/${id}`, salarymgmt);
}

function deleteSalaryMgmt(id: number) {
  return http.delete(`/salarys/${id}`);
}

// function getSalaryMgmts() {
//   return http.get("/salaries");
// }
// function getSalaryYearMgmts() {
//   return http.get("/salaries/year");
// }
// function getSalaryDate(startD: string, endD: string) {
//   return http.get(`/salaries/salarydate?startD=${startD}&endD=${endD}`);
// }
// function getSalaryCIO(startD: string, endD: string) {
//   return http.get(`/salaries/salarycio?startD=${startD}&endD=${endD}`);
// }
// function getOneSalaryMgmt(id: number) {
//   return http.get(`/salaries/${id}`);
// }

// function saveSalaryMgmt(salarymgmt: SalaryMgmt) {
//   return http.post("/salaries", salarymgmt);
// }

// function updateSalaryMgmt(id: number, salarymgmt: SalaryMgmt) {
//   return http.patch(`/salaries/${id}`, salarymgmt);
// }

// function deleteSalaryMgmt(id: number) {
//   return http.delete(`/salaries/${id}`);
// }

export default {
  getSalaryMgmts,
  saveSalaryMgmt,
  updateSalaryMgmt,
  deleteSalaryMgmt,
  getOneSalaryMgmt,
  getSalaryYearMgmts,
  getSalaryDate,
  getSalaryCIO,
};
