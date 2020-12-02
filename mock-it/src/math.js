exports.asyncSum = (a, b) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (typeof a !== "number" || typeof b !== "number") {
        rej("Invalid input");
      }
      res(a + b);
    }, 100);
  });
