import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "../src/components/navbar";

import PokemonListPage from "./pages/pokemon-list-page";
import PokemonDetail from "./pages/pokemon-detail";
import MyPokemon from "./pages/my-pokemon";

const PokemonRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            element={
              <FadeIn>
                <PokemonListPage />
              </FadeIn>
            }
          />
          <Route
            path="/pokemon-detail"
            element={
              <FadeIn>
                <PokemonDetail />
              </FadeIn>
            }
          />
          <Route
            path="/my-pokemon"
            element={
              <FadeIn>
                <MyPokemon />
              </FadeIn>
            }
          />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
};

const FadeIn = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default PokemonRouter;
