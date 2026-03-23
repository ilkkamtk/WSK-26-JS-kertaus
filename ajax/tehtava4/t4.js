const reqresApiKey = "reqres_1751820b40804df48bc6f2057e1973c4";

const reqresUrl = "https://reqres.in/api/users";

const fetchData = async (url, options) => {
  try {
    const data = await fetch(url, options);

    if (data.status < 200 || data.status >= 300) {
      throw new Error("Oma virheviesti tähän");
    }

    return await data.json();
  } catch (error) {
    console.log("ei toimi", error);
  }
};

const options = {
  headers: {
    "x-api-key": reqresApiKey,
  },
};

const main = async () => {
  console.log("logitus ennen kutsua");
  const result = await fetchData(reqresUrl, options);

  console.log("result", result);
};

main();
