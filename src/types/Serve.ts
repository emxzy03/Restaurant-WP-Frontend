import type MenuQueue from "./MenuQueue";
import type TableManagement from "./TableManagement";

export default interface Serve {
  table: TableManagement;
  serveLs: MenuQueue[];
  numServe: number;
  numAll: number;
}
