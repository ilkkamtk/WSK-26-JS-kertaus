// eslint-disable-next-line no-unused-vars
const fetchData = async (url, options) => {
  try {
    const data = await fetch(url, options);

    if (data.status < 200 || data.status >= 300) {
      throw new Error('Oma virheviesti tähän');
    }

    return await data.json();
  } catch (error) {
    console.log('ei toimi', error);
  }
};
