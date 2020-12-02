// jest.mock("../src/utils");

// jest.mock("../src/utils", () => {
//   return { sum: () => 5 };
// });

const utils = require("../src/utils");

const { calcExpense } = require("../src/expense");

test("should calc expense", () => {
  const sumSpy = jest.spyOn(utils, "sum");
  // sum.mockReturnValue(3);
  // expect.assertions(2);
  const res = calcExpense(3, 2);
  expect(res).toBe(5);
  expect(sumSpy).toHaveBeenCalled();
});
