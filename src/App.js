import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import NoResultsMessage from './components/NoResultsMessage';
import './App.css';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
        setPokemonData(response.data.results);
        setSearchResults(response.data.results); // Mostrar todos los Pokémon al inicio
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filteredResults = pokemonData.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  return (
    <div className="app">
      <h1>Pokémon</h1>
      <SearchBar handleSearch={handleSearch} />
      <div className="pokemon-container">
        {searchResults.length === 0 ? (
          <NoResultsMessage />
        ) : (
          searchResults.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(pokemon.url)}.png`}
            />
          ))
        )}
      </div>
    </div>
  );
};

const getPokemonId = (pokemonUrl) => {
  const urlParts = pokemonUrl.split('/');
  return urlParts[urlParts.length - 2]; // El ID del Pokémon está en la penúltima posición de la URL
};

export default App;