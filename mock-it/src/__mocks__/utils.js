const sum = (n1, n2) => {
  console.log("mocking sum");
  return n1 + n2;
};

const greeting = (name) => {
  console.log("mocking greeting=======");
  return `${name} says goodmorning`;
};

module.exports = { sum, greeting };
