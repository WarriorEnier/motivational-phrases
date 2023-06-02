import { useState, useEffect } from "react";
import { getRandomQuote } from "../services/fact";

const imageAuthor250px =
  "https://commons.wikimedia.org/w/api.php?prop=pageimages%7Cimageinfo%7Cinfo%7Credirects&gsrnamespace=6&pilimit=max&pithumbsize=250&iiprop=extmetadata&iiextmetadatafilter=ImageDescription&action=query&inprop=url&redirects=&format=json&generator=search&gsrsearch=intitle:";

export function useAuthorImage({ frase }) {
  const [image, setImage] = useState("");
  useEffect(() => {
    let pageId = null;
    if (!frase.author) return;
    const author = frase.author ? frase.author.replace(/ /g, "%20") : "";

    const loadQuote = async () => {
      try {
        const res = await getRandomQuote(
          `${imageAuthor250px}${author}&origin=*`
        );
        for (const prop in res.query.pages) {
          if (res.query.pages) {
            pageId = prop;
            break;
          }
        }
        res.query.pages[pageId].thumbnail &&
          frase &&
          setImage(res.query.pages[pageId].thumbnail["source"]);
      } catch (error) {
        throw new error();
      }
    };
    loadQuote();
  }, [frase]);
  return { image };
}