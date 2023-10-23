import type Employee from "@/types/Employee";
import http from "./axios";

function getEmployees() {
  return http.get("/employees");
}

function saveEmployee(employee: Employee) {
  return http.post("/employees", employee);
}

function updateEmployee(id: number, employee: Employee) {
  return http.patch(`/employees/${id}`, employee);
}

function deleteEmployee(id: number) {
  return http.delete(`/employees/${id}`);
}

function getOneEmployee(id: number) {
  return http.get(`/employees/${id}`);
}

export default {
  getEmployees,
  saveEmployee,
  updateEmployee,
  deleteEmployee,
  getOneEmployee,
};
