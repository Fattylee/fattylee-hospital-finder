const _axios = require("axios");

const axios = _axios.create({ baseURL: "http://localhost:5000/api/v1" });

(async () => {
  try {
    // const { data } = await axios.post("/auth/login", {
    //   username: "fattyleezs",

    //   password: "password",
    //   email: "f63atai4humility@yahoo.com",
    // });

    const { data } = await axios.get("/products");

    console.log(data);
  } catch (ex) {
    console.log(ex.response);
  }
})();
