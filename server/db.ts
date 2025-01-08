import { DB } from "./deps.ts";

const db = new DB("./db/tasks.db");

// create the db if it doesnt exist
export const setupDb = () => {
  db.query(`
		   CREATE TABLE IF NOT EXISTS tasks (
			   id INTEGER PRIMARY KEY AUTOINCREMENT,
			   name TEXT NOT NULL,
			   completed BOOL NOT NULL DEFAULT FALSE
		   );
  	`);
};

export default db;
