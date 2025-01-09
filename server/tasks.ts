import db from "./db.ts";

//fetch tasks
export function getTasks() {
  const rows = db.query(`SELECT id, name, completed FROM tasks;`);
  return rows.map(([id, name, completed]) => ({ id, name, completed }));
}

//addTask
export function addTask(name: string) {
  db.query(
    `
			 INSERT INTO tasks (name, completed) VALUES (?, ?);
			 `,
    [name, false],
  );
}

//delete tasks by id
export function deleteTask(id: number) {
  db.query(
    `
			 DELETE FROM tasks WHERE id = ?;
			 `,
    [id],
  );
}

//update tasks
export function updateTask(id: number, completed: boolean) {
  db.query(
    `
			 UPDATE tasks SET completed = ? WHERE id = ?;
			 `,
    [completed, id],
  );
}
