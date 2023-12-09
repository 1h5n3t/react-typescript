import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Button, CssBaseline } from "@mui/material";

import './App.css';

import PokemonType from "./PokemonType";
import PokemonRow from "./Components/PokemonRow";
import PokemonInfo from "./Components/PokemonInfo";
import PokemonFilter from "./Components/PokemonFilter";
import PokemonTable from "./Components/PokemonTable";

import PokemonContext from "./PokemonContext";

const pokemonReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    case "SET_POKEMON":
      return {
        ...state,
        pokemon: action.payload,
      };
    case "SET_SELECTED_POKEMON":
      return {
        ...state,
        selectedPokemon: action.payload,
      };
    default:
      throw new Error("No action");
  }
};

const Title = styled.h1`
  text-align: center;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;

const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;

function App() {
  const [state, dispatch] = React.useReducer(pokemonReducer, {
    pokemon: [],
    filter: "",
    selectedPokemon: null,
  });

  React.useEffect(() => {
    fetch("http://localhost:3000/react-typescript/pokemon.json")
    .then((resp) => resp.json())
    .then((data) => dispatch({
      type: "SET_POKEMON",
      payload: data,
    }));
  }, [])

  if (!state.pokemon) {
    return <div>Loading data</div>
  }

  return (
    <PokemonContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Container>
        <CssBaseline/>

        <Title>Pokemon Search</Title>
        
        <TwoColumnLayout>
          <div>
            <PokemonFilter/>
            <PokemonTable/>
          </div>
          <PokemonInfo/>
        </TwoColumnLayout>
      </Container>
    </PokemonContext.Provider>
    
  );
}

export default App;
