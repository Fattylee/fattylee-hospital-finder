const { sum } = require("lodash");
const { calcExpense } = require("./expense");
const { asyncSum } = require("./math");
const utils = require("./utils");

// jest.mock("./utils");
jest.mock("./utils", () => {
  return {
    // a: 34,
    sum(a, b) {
      console.log("replace mocking");
      return a + b;
    },
  };
});

test("should calculate asyncMath correctly correctly", () => {
  // expect(res).toBeCloseTo(5);
  expect.assertions(1);
  const res = asyncSum(2, 3);

  // return expect(res).resolves.toBe(5);
  return res.then((v) => {
    expect(v).toBe(5);
  });
}, 6000);

test("should reject asyncSum", () => {
  return expect(asyncSum("2", 2)).rejects.toBe("Invalid input");
});
test("should reject asyncSum in tryCatch", async () => {
  try {
    await asyncSum();
  } catch (error) {
    expect(error).toBe("Invalid input");
  }
});

test("should calcExpense correctly", () => {
  const mockFn = jest.fn((a, b) => {
    console.log("freestyling...sum");
    return a + b;
  });
  // utils.sum = mockFn;
  // console.log(utils.sum(3, 8));

  // console.log(utils.a);
  expect.assertions(1);
  const res = calcExpense(3, 1);
  expect(res).toBe(4);
});
