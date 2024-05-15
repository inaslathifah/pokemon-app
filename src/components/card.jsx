import React from "react";

const Card = ({ children, onClick, props, type }) => {
  return (
    <>
      {type === "list" ? (
        <div
          onClick={onClick}
          {...props}
          className="w-full h-full flex flex-column justify-center items-center gap-x-5 p-5 rounded-md shadow-md cursor-pointer bg-pink-200 hover:bg-white"
        >
          {children}
        </div>
      ) : (
        type === "information" && (
          <div
            {...props}
            className="w-full h-full lg:flex md:flex justify-center items-center gap-x-5 p-5 rounded-md shadow-md bg-pink-200"
          >
            {children}
          </div>
        )
      )}
    </>
  );
};

export default Card;
