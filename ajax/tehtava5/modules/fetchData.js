const fetchData = async (url, options) => {
  const data = await fetch(url, options);

  if (!data.ok) {
    throw new Error(data.statusText);
  }

  return await data.json();
};

export default fetchData;
