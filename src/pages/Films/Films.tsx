import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import "./films.css";
import { Link } from "react-router-dom";

interface Films {
  description: string;
  director: string;
  id: string;
  image: string;
  locations: string[];
  movie_banner: string;
  original_title: string;
  original_title_romanised: string;
  people: string[];
  producer: string;
  release_date: string;
  rt_score: string;
  species: string[];
  title: string;
  url: string;
  vehicles: string[];
}
function Films() {
  const [films, setFilms] = useState<Films[]>([]);
  const baseUrl = import.meta.env.VITE_GHIBLI_API_URL_FILMS;
  console.log(baseUrl)

  useEffect(() => {
    const getFilms = async () => {
      try {
        await fetch(baseUrl)
          .then((response) => response.json())
          .then((data) => {
            setFilms(data);
            console.log(data);
          });
      } catch (error) {
        console.error(error);
      }
    };

    if (films.length === 0) {
      getFilms();
    }
  }, [baseUrl, films]);

  return (
    <div className="container_films">
      <div className="films">
        {films.map((value: Films, index) => {

          return <li key={index}>
            <Link to={`/films/${value.id}`} state={{ image: value.image }}>
              <Card title={value.title} image={value.image}
              gifPath={`assets/${value.id}.gif`} />
            </Link>
          </li>
        })}
      </div>
    </div>
  );
}

export default Films;
