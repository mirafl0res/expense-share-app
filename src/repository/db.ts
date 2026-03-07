import { SQL } from "bun";

// const db = new SQL({});
// export default db;


const globalKey = Symbol.for("myapp.db");

if (!(globalThis as any)[globalKey]) {
  (globalThis as any)[globalKey] = new SQL({});
}

const db = (globalThis as any)[globalKey];

export default db;
