import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./film.css";
import Button_Film from "../../components/button/Button_Film";
import Modal from "../../components/modal/Modal";
import rt from "../../assets/Rotten_Tomatoes.svg";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

interface Film {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
  people: string[];
  species: string[];
  locations: string[];
  vehicles: string[];
  url: string;
}

function Film() {
  const { id } = useParams();
  const location = useLocation();
  const { image } = location.state;
  const baseUrl = `${import.meta.env.VITE_GHIBLI_API_URL_FILMS}${id}`;
 
  const [filmDetails, setFilmDetails] = useState<Film>();

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"; 

  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const getFilmDetails = async () => {
      await fetch(baseUrl)
        .then((results) => results.json())
        .then((data) => {
          console.log(data);
          setFilmDetails(data);
        });
    };

    getFilmDetails();
  }, [baseUrl]);

  const [isModalPeopleOpen, setIsModalPeopleOpen] = useState(false);
  const [isModalSpeciesOpen, setIsModalSpeciesOpen] = useState(false);
  const [isModalVehiclesOpen, setIsModalVehiclesOpen] = useState(false);

  const openModalPeople = () => {
    setIsModalPeopleOpen(!false);
  };

  const handleCloseModalPeople = () => {
    setIsModalPeopleOpen(false);
  };

  const openModalSpecies = () => {
    setIsModalSpeciesOpen(!false);
  };

  const handleCloseModalSpecies = () => {
    setIsModalSpeciesOpen(false);
  };

  const openModalVehicles = () => {
    setIsModalVehiclesOpen(!false);
  };

  const handleCloseModalVehicles = () => {
    setIsModalVehiclesOpen(false);
  };

  const fetchMovieIdFromTMDB = async (title: string, year:string) => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      title
    )}`;
    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
      console.log(data)
      if (data.results && data.results.length > 0) {
        console.log(data.results);
        const result_data = data.results.filter((value: { release_date: string | string[]; })=> {
          if(value.release_date.includes(year)) return value;
        })
        console.log(result_data)
        return result_data[0].id;
      } else {
        throw new Error("Película no encontrada");
      }
    } catch (error) {
      console.error("Error al buscar la película en TMDb:", error);
      return null;
    }
  };
  const fetchImagesFromTMDB = async (movieId: number) => {
    const imagesUrl = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
    try {
      const response = await fetch(imagesUrl);
      const data = await response.json();
      console.log(data);
      if (data.backdrops && data.backdrops.length > 0) {
        return data.backdrops;
      } else {
        throw new Error("Película no encontrada");
      }
    } catch (error) {
      console.error("Error al buscar la película en TMDb:", error);
      return null;
    }
  };

  
  const handleGalleryButtonClick = (title: string, year: string) => {
    fetchMovieIdFromTMDB(title,year)
      .then((movieId) => {
        if (movieId) {
          return fetchImagesFromTMDB(movieId);
        } else {
          console.log("ID de película no encontrado");
          return Promise.resolve();
        }
      })
      .then((images) => {
        if (images) {
          const imageUrls = images.map(
            (image: { file_path: string; }) => IMAGE_BASE_URL + image.file_path
          );
          setGalleryImages(imageUrls);
        }
      })
      .catch((error) => {
        console.error("Error al obtener imágenes:", error);
      });
  };

  useEffect(()=> {
    if (filmDetails?.title && filmDetails?.release_date) {
      handleGalleryButtonClick(filmDetails.title, filmDetails.release_date);
    }

  }, [filmDetails?.title, filmDetails?.release_date])

  return (
    <div className="container_film">
      <div className="wrapper_film">
        <img className="poster" src={image} alt="" />
        <div className="film_details">
          <h1>{filmDetails?.title}</h1>
          <div className="origin_title">
            <h2>{filmDetails?.original_title}</h2>
            <h3>{filmDetails?.original_title_romanised}</h3>
          </div>
          <div className="score_wrapper">
            <img id="score_icon" src={rt} alt="" />
            <p id="score">{filmDetails?.rt_score}</p>
          </div>
          <p id="description">{filmDetails?.description}</p>
          <p>Director: {filmDetails?.director}</p>
          <p>Producer: {filmDetails?.producer}</p>
          <p>Release year: {filmDetails?.release_date}</p>
          <p id="time">
            <AccessTimeOutlinedIcon />
            Time: {filmDetails?.running_time} min
          </p>

          <div className="btns_film">
            <Button_Film text={"People"} onClick={openModalPeople}>
              {isModalPeopleOpen && (
                <Modal
                  type={"People"}
                  data={filmDetails?.people}
                  onClose={handleCloseModalPeople}
                />
              )}
            </Button_Film>
            <Button_Film text={"Species"} onClick={openModalSpecies}>
              {isModalSpeciesOpen && (
                <Modal
                  type={"Species"}
                  data={filmDetails?.species}
                  onClose={handleCloseModalSpecies}
                />
              )}
            </Button_Film>
            <Button_Film text={"Vehicles"} onClick={openModalVehicles}>
              {isModalVehiclesOpen && (
                <Modal
                  type={"Vehicles"}
                  data={
                    Array.isArray(filmDetails?.vehicles)
                      ? filmDetails?.vehicles
                      : []
                  }
                  onClose={handleCloseModalVehicles}
                />
              )}
            </Button_Film>
            
          </div>
        </div>
      </div>
      <div className="gallery">
        {galleryImages.length > 0 && (
          <div className="gallery">
            {galleryImages.map((imageUrl, index) => (
              <img className="filmGallery" loading="lazy" key={index} src={imageUrl} alt={`Gallery image ${index}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Film;
