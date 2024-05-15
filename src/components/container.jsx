import React from "react";

const Container = ({ children, title }) => {
  return (
    <section className="w-screen h-full flex flex-col justify-center items-center p-10 bg-pink-400">
      <p className="my-10 text-2xl font-semibold">{title}</p>
      {children}
    </section>
  );
};

export default Container;
