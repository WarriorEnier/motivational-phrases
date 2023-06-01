import PropTypes from "prop-types";

export const Button = (props) => {
  const handleNewQuote = () => {
    props.onClick();
  };
  return (
    <>
      <button
        onClick={handleNewQuote}
        className="text-white bg-green-400 hover:bg-green-600 transition duration-500 ease-in-out w-full lg:w-1/2 h-[20%] md:h-[15%] lg:mx-6 text-2xl rounded-xl"
      >
        {props.texto}
      </button>
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  texto: PropTypes.string.isRequired,
};
