import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonCard = ({ name, imageUrl }) => {
  const [types, setTypes] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [evolutions, setEvolutions] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setTypes(response.data.types.map((type) => type.type.name));

        // Obtener las evoluciones del Pokemon
        const evolutionResponse = await axios.get(response.data.species.url);
        const evolutionChainResponse = await axios.get(evolutionResponse.data.evolution_chain.url);
        setEvolutions(getEvolutionChain(evolutionChainResponse.data.chain));
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, [name]);

  // Función para obtener todas las evoluciones de la cadena evolutiva
  const getEvolutionChain = (chain) => {
    const evolutions = [];
    while (chain) {
      evolutions.push(chain.species.name);
      chain = chain.evolves_to[0];
    }
    return evolutions;
  };

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`pokemon-card ${isExpanded ? 'expanded' : ''}`} onClick={handleCardClick}>
      <img src={imageUrl} alt={name} />
      <h2>{name}</h2>
      <div className="types">
        {types.map((type, index) => (
          <span key={index} className="type">{type}</span>
        ))}
      </div>
      {isExpanded && (
        <div className="evolutions">
          <h3>Evolutions:</h3>
          <ul>
            {evolutions.map((evolution, index) => (
              <li key={index}>{evolution}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonCard;
