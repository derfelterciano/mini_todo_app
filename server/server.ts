import { setupDb } from "./db.ts";
import * as tasks from "./tasks.ts";

//setup db
setupDb();

Deno.serve(async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const method = req.method;
  const pathParts = url.pathname.split("/").filter(Boolean);

  //dynamic routing
  if (pathParts[0] === "tasks") {
    if (method === "GET") {
      const taskList = tasks.getTasks();
      return new Response(JSON.stringify(taskList), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (method === "POST") {
      const body = await req.json();
      tasks.addTask(body.name);
      return new Response("Task added", { status: 200 });
    }

    if (pathParts.length === 2) {
      const id = parseInt(pathParts[1]);

      if (method === "DELETE") {
        tasks.deleteTask(id);
        return new Response(null, { status: 204 });
      }

      if (method === "PUT") {
        const body = await req.json();
        tasks.updateTask(id, body.completed);
        return new Response("Task updated", { status: 200 });
      }
    }
  }

  return new Response("Not Found!", { status: 400 });
});
