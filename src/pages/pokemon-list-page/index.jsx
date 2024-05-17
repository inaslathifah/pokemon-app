import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container";
import Card from "../../components/card";
import Loading from "../../components/loading";
import { getAllPokemon, getDetailPokemon } from "../../services/apis/api";

const PokemonListPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState([]);

  const getPokemonList = async () => {
    const pokemonData = await getAllPokemon(10);
    const pokemonList = await Promise.all(
      pokemonData.data.results.map(async (pokemon) => {
        const detail = await getPokemonDetail(pokemon.url);
        return { ...pokemon, detail };
      })
    );
    setCharacter(pokemonList);
    setIsLoading(false);
  };

  const getPokemonDetail = async (url) => {
    try {
      const response = await getDetailPokemon(url);
      return response.data;
    } catch (error) {
      console.error("Failed to get Pokemon detail: ", error);
    }
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  const handleClickPokemon = (name, index) => {
    navigate("/pokemon-detail", {
      state: {
        name: name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`,
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container title={"Pokemon List"}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {character.map((item, index) => (
          <Card
            type={"list"}
            key={index}
            onClick={() => handleClickPokemon(item.name, index)}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
              }.png`}
              className="w-36 h-36 md:w-48 md:h-48 lg:w-64 lg:h-64"
              alt={item.name}
            />
            <p className="font-semibold text-black">
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </p>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default PokemonListPage;
