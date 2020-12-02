let axios = require("axios");

axios = axios.create({ baseURL: "http://localhost:5000/api/v1" });

(async () => {
  try {
    // const { data } = await axios.post("/auth/login", {
    //   username: "fattyleezs",

    //   password: "password",

    //   email: "f63atai4humility@yahoo.com",
    // });

    const token = await login();

    const data = await createProduct(token);

    console.log(data);

    // console.log(JSON.stringify(data, null, 1));
  } catch (ex) {
    console.log(ex.response.data);
  }
})();

async function login() {
  const {
    data: { token },
  } = await axios.post("/auth/login", {
    username: "fattylee",
    password: "password",
  });
  console.log(token, "==");
  return token;
}

async function createProduct(token) {
  const { data } = await axios.post(
    "/products?OWNer=",

    { title: "rice", price: 5 },

    {
      headers: {
        authorization: `bearer     ${token}`,
      },
    }
  );
  return data;
}
