import { Loading } from "./components/loading";
import { Button } from "./components/Button";
import { useAuthorImage } from "./hooks/useAuthorImage";
import { useFraseFact } from "./hooks/useFraseFact";

import "./App.css";

function App() {
  const { frase, refreshFrase } = useFraseFact();
  const { image } = useAuthorImage({ frase });

  const handleNewQuote = async () => {
    refreshFrase();
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
            <Button onClick={handleNewQuote} texto={"Actualizar"} />
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
