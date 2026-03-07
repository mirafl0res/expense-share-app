import { SQL } from "bun";

let db: SQL;

if (Bun.env.NODE_ENV === "development") {
  const globalKey = Symbol.for("myapp.db");
  if (!(globalThis as any)[globalKey]) {
    (globalThis as any)[globalKey] = new SQL({});
  }
  db = (globalThis as any)[globalKey];
} else {
  db = new SQL({});
}

export default db;
