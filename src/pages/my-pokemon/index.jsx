import React, { useEffect } from "react";
import Swal from "sweetalert2";
import Container from "../../components/container";
import Card from "../../components/card";

import { usePokemonContext } from "../../services/context/pokemon-context";
import { releasePokemon } from "../../services/apis/api";

const MyPokemon = () => {
  const { capturedPokemons } = usePokemonContext();

  const generateReleasePokemon = async (name) => {
    const randomNumber = Math.floor(Math.random() * (20 - 1 + 1) + 1);
    const result = await releasePokemon(randomNumber);
    if (result.data.isPrimeNumber === true) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Prime number founded, sucess release your ${name}!`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: `Prime number not founded, failed release and try again!`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    Swal.fire({
      icon: "info",
      title: "Rules",
      text: "To release a Pokemon, the system will check if the generated number is prime. If it is prime, the release will be successful.",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  }, []);

  return (
    <Container title={"My Pokemon"}>
      <div className="h-screen">
        <div className="h-max w-max grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 gap-10">
          {capturedPokemons
            ? capturedPokemons?.map((item) => {
                return (
                  <Card type={"information"} key={item.name}>
                    <div className="mr-20">
                      <img src={item?.image} alt="" />
                      <p className="text-black font-normal">
                        Origin Name :{" "}
                        <span className="font-bold">{item?.name}</span>
                      </p>
                      <p className="text-black font-normal">
                        Given Name :{" "}
                        <span className="font-bold">{item?.nickname}</span>
                      </p>
                    </div>
                    <div className="gap-y-5 text-black">
                      <p>
                        <b>Abilities:</b>
                      </p>
                      <ul>
                        {item?.abilities.map((ability, index) => (
                          <li key={index}>
                            <span className="bullet">&bull;</span>{" "}
                            {ability.ability.name}
                          </li>
                        ))}
                      </ul>
                      <p>
                        <b>Base Experience:</b> {item?.base_experience}
                      </p>
                      <p>
                        <b>Height:</b> {item?.height}
                      </p>
                      <p>
                        <b>Weight:</b> {item?.weight}
                      </p>
                      <div className="mt-10 w-full">
                        <button
                          className="w-full text-white font-semibold bg-pink-500"
                          onClick={() => generateReleasePokemon(item?.nickname)}
                        >
                          Release
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })
            : null}
        </div>
      </div>
    </Container>
  );
};

export default MyPokemon;
