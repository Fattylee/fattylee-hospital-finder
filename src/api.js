const createTodo = (todoPath = "/todos", todo) => {
  return new Promise((resolve, reject) => {
    if (todoPath.includes("todo")) {
      console.log("=============Real createTodo api=============");
      return resolve(todo);
    }
    reject("failed to include a todo in the route");
  });
};

module.exports = { createTodo };
