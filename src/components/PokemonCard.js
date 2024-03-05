// src/components/PokemonCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonCard = ({ name, imageUrl }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setTypes(response.data.types.map((type) => type.type.name));
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, [name]);

  return (
    <div className="pokemon-card">
      <img src={imageUrl} alt={name} />
      <h2>{name}</h2>
      <div className="types">
        {types.map((type, index) => (
          <span key={index} className="type">{type}</span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
