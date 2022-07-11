// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  const [state, setState] = React.useState({
    status: "idle",
    pokemon: null,
    error: null,
  });
  // const [pokemon, setPokemon] = React.useState(null);
  // const [error, setError] = React.useState(null);
  const [status, setStatus] = React.useState("idle");

  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  React.useEffect(() => {
    setState({
      status: "pending",
      pokemon: null, 
      error: null
    })
    // setPokemon(null);
    // setError(null);
    fetchPokemon(pokemonName).then(
    /* update all the state here */
      pokemon => setState({
        status: "resolved",
        pokemon: pokemon,
        error: state.error,
      }),
      error => setState(...state, {
        status: "rejected",
        pokemon: state.pokemon,
        error: error,
      }))
    }, [pokemonName]);

  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />
  if (state.error) {
    return (
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
      </div>
    )
  } else if (!pokemonName) {
    return "Submit a pokemon";
  } else if (!state.pokemon) {
    return <PokemonInfoFallback name={pokemonName} />
  } else return <PokemonDataView pokemon={state.pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
