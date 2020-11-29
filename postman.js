let axios = require("axios");

axios = axios.create({ baseURL: "http://localhost:5000/api/v1" });

(async () => {
  try {
    // const { data } = await axios.post("/auth/login", {
    //   username: "fattyleezs",

    //   password: "password",
    //   email: "f63atai4humility@yahoo.com",
    // });
    const {
      data: { token },
    } = await axios.post("/auth/login", {
      username: "fattylee",

      password: "password",
    });
    console.log(token, "==");

    const { data } = await axios.post(
      "/products?OWNer=True",

      { title: "rice" },

      {
        headers: {
          authorization: `bearer                 ${token}`,
        },
      }
    );

    console.log(data);

    // console.log(JSON.stringify(data, null, 1));
  } catch (ex) {
    console.log(ex.response.data);
  }
})();
