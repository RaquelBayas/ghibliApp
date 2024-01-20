import { ChangeEvent, useEffect, useState } from "react";
import "./Species.css";
import Card from "../../components/card/Card";

interface Species {
  id: string;
  name: string;
  classification: string;
  hair_colors: string[];
  eye_colors: string[];
  people: string[];
  url: string;
}

function Species() {
  const speciesUrl = import.meta.env.VITE_GHIBLI_API_URL_SPECIES;
  const [species, setSpecies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getSpecies = async () => {
      try {
        fetch(speciesUrl)
          .then((response) => response.json())
          .then((data) => {
            setSpecies(data);
          });
      } catch (error) {
        console.error(error);
      }
    };

    getSpecies();
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  return (
    <div className="container_data">
      <input
        type="search"
        name=""
        id=""
        placeholder="Search specie..."
        value={search}
        onChange={handleSearch}
      />
      <div className="wrapper_data">
        {species
          .filter((specie: Species) => {
            if (!specie) return true;
            return specie.name.toLowerCase().includes(search.toLowerCase());
          })
          .map((value: Species, index) => (
            <div className="div_data" key={index}>
              {
                <h1>{value.name}</h1>
                }
            </div>
          ))}
      </div>
    </div>
  );
}

export default Species;
