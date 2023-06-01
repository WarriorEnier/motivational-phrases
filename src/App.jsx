import { Loading } from "./components/loading";
import { Button } from "./components/Button";
import { useState, useEffect } from "react";
import "./App.css";

const apifrase = "https://api.quotable.io/random";
//const imageAuthor = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=`;
const imageAuthor250px =
  "https://commons.wikimedia.org/w/api.php?prop=pageimages%7Cimageinfo%7Cinfo%7Credirects&gsrnamespace=6&pilimit=max&pithumbsize=250&iiprop=extmetadata&iiextmetadatafilter=ImageDescription&action=query&inprop=url&redirects=&format=json&generator=search&gsrsearch=intitle:";

function App() {
  const [frase, setFrase] = useState({ author: null, content: null });
  const [image, setImage] = useState("");

  const getRandomQuote = async (api) => {
    try {
      const res = await fetch(api);
      const json = await res.json();
      return json;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const loadQuote = async () => {
    try {
      const res = await getRandomQuote(apifrase);
      setFrase(res);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    loadQuote();
  }, []);

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
        throw new error;
      }
    };

    loadQuote();
  }, [frase]);

  const handleNewQuote = () => {
    loadQuote();
  };

  return (
    <>
      <div className="bg-white  h-screen flex items-center justify-center ">
        <section className="flex  flex-col-reverse lg:flex-row justify-center h-screen w-full items-center gap-5  px-4 bg-black">
          <div className="w-full lg:w-3/4 h-2/3 flex flex-col items-end justify-center  ">
            {frase.content && (
              <p className="text-4xl">
                <span className="text-4xl text-gray-200">❝</span>
                <span className="mx-5 px-5 text-gray-200 w-full">
                  {frase.content}
                </span>
                <span className="text-4xl text-gray-200">❞</span>
              </p>
            )}
            {frase.author && (
              <h1 className=" lg:mx-8 my-10 text-lg italic font-serif text-gray-400">
                {frase.author}
              </h1>
            )}
           <Button onClick={handleNewQuote} texto={'Actualizar'}/>
          </div>
          {image ? (
            <img
              className="rounded-full w-36 h-36 md:w-60 md:h-60 "
              src={image}
              alt=""
            />
          ) : (
            <Loading />
          )}
        </section>
      </div>
    </>
  );
}

export default App;
