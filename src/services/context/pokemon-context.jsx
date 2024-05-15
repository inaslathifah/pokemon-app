import React, { createContext, useContext, useState } from "react";

const PokemonContext = createContext();

export const usePokemonContext = () => useContext(PokemonContext);

export const PokemonProvider = ({ children }) => {
  const [capturedPokemons, setCapturedPokemons] = useState(
    JSON.parse(localStorage.getItem("capturedPokemons")) || []
  );

  const capturePokemon = (pokemon) => {
    setCapturedPokemons([...capturedPokemons, pokemon]);
    localStorage.setItem(
      "capturedPokemons",
      JSON.stringify([...capturedPokemons, pokemon])
    );
  };

  const releasePokemon = (pokemon) => {
    const updatedPokemons = capturedPokemons.filter(
      (capturedPokemon) => capturedPokemon.nickname !== pokemon.nickname
    );
    setCapturedPokemons(updatedPokemons);
    localStorage.setItem("capturedPokemons", JSON.stringify(updatedPokemons));
  };

  return (
    <PokemonContext.Provider
      value={{
        capturedPokemons,
        capturePokemon,
        releasePokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
