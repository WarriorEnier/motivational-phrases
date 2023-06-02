export const getRandomQuote = async (api) => {
    try {
      const res = await fetch(api);
      const json = await res.json();
      return json;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };