import { useState, useEffect } from "react";
import { getRandomQuote } from "../services/fact";
const apifrase = "https://api.quotable.io/random";
//const imageAuthor = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=`;

export const useFraseFact = () =>{
  const [frase, setFrase] = useState({ author: null, content: null });
  const refreshFrase = () => {
    getRandomQuote(apifrase).then((newFact) => setFrase(newFact));
  }
  useEffect(() => {
    refreshFrase()
  }, []);
  return {frase, refreshFrase}
}