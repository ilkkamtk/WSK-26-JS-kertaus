const h1 = document.querySelector("h1");

console.log("h1", h1);

const reqresApiKey = "reqres_1751820b40804df48bc6f2057e1973c4";

const reqresUrl = "https://reqres.in/api/users";

const callApi = async () => {
  const data = await fetch(reqresUrl, {
    method: "post",
    body: JSON.stringify({ name: "Juha", job: "teacher" }),
    headers: {
      "x-api-key": reqresApiKey,
    },
  });

  const result = await data.json();

  console.log("data", data);
  console.log("result", result);
};

console.log("logitus ennen kutsua");
callApi();
console.log("logitus kutsun jälkeen");
