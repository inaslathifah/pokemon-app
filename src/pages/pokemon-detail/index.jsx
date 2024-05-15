import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Container from "../../components/container";
import Card from "../../components/card";
import Loading from "../../components/loading";

import { usePokemonContext } from "../../services/context/pokemon-context";
import { getDetailCharacter, catchPokemon } from "../../services/apis/api";

const PokemonDetail = () => {
  const location = useLocation();
  const name = location?.state?.name;
  const image = location?.state?.image;
  const { capturePokemon } = usePokemonContext();

  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [nickname, setNickname] = useState("");
  const [captured, setCaptured] = useState(false);
  const [loading, setLoading] = useState(true);

  const getInformationCharacter = async (name) => {
    const result = await getDetailCharacter(name);
    setPokemonInfo(result);
    setLoading(false);
  };

  useEffect(() => {
    if (name) {
      getInformationCharacter(name);
    }
  }, [name]);

  const generatePokemon = async () => {
    const result = await catchPokemon();
    if (result?.data?.probability === "Success") {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Gotcha! You have gained ${result?.data?.probability}`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Claim",
      }).then((res) => {
        if (res.isConfirmed) {
          setCaptured(true);
          const capturedPokemon = {
            name,
            nickname,
            image,
            abilities: pokemonInfo?.data?.abilities,
            base_experience: pokemonInfo?.data?.base_experience,
            height: pokemonInfo?.data?.height,
            weight: pokemonInfo?.data?.weight,
            location_area_encounters:
              pokemonInfo?.data?.location_area_encounters,
          };
          capturePokemon(capturedPokemon);
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: `Please try again`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((res) => {
        if (res.isConfirmed) {
          setCaptured(false);
        }
      });
    }
  };

  const addToMyPokemonList = () => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Pokemon added to My Pokemon List!",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container
      title={`Detail Information of ${
        name.charAt(0).toUpperCase() + name.slice(1)
      }`}
    >
      <div className="h-full">
        <div className="h-screen">
          {pokemonInfo?.data && (
            <Card type={"information"}>
              <img
                src={image}
                className="w-36 h-36 md:w-48 md:h-48 lg:w-64 lg:h-64"
              />
              <div className="gap-y-5 text-black">
                <p>
                  <b>Abilities:</b>
                </p>
                <ul>
                  {pokemonInfo?.data?.abilities.map((ability, index) => (
                    <li key={index}>
                      <span className="bullet">&bull;</span>{" "}
                      {ability.ability.name}
                    </li>
                  ))}
                </ul>
                <p>
                  <b>Base Experience:</b> {pokemonInfo?.data?.base_experience}
                </p>
                <p>
                  <b>Height:</b> {pokemonInfo?.data?.height}
                </p>
                <p>
                  <b>Weight:</b> {pokemonInfo?.data?.weight}
                </p>
                <p>
                  <b>Location Area:</b>{" "}
                  {pokemonInfo?.data?.location_area_encounters}
                </p>
                {!captured && (
                  <div className="mt-20 space-x-10">
                    <button
                      className="bg-pink-700 hover:bg-pink-800 focus:outline-none border-none text-white"
                      onClick={generatePokemon}
                    >
                      Catch Pokemon
                    </button>
                  </div>
                )}
                {captured && (
                  <div className="mt-20 space-x-10">
                    <p>Congratulations! You caught the Pokemon!</p>
                    <p>Give it a nickname:</p>
                    <input
                      type="text"
                      placeholder="Enter nickname"
                      className="p-3 rounded-md bg-slate-100 focus:outline-none"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                    />
                    <button
                      className="bg-pink-700 hover:bg-pink-800 focus:outline-none border-none text-white"
                      onClick={addToMyPokemonList}
                    >
                      Add to My Pokemon List
                    </button>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </Container>
  );
};

export default PokemonDetail;
