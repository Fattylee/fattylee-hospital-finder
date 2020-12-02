const { sum } = require("./utils");

exports.calcExpense = (bananaPrice, ricePrice) => {
  console.log("calculating expense...");
  const totalExpense = sum(bananaPrice, ricePrice);
  return totalExpense;
};
