import { useEffect, useState } from "react";
import "./Modal.css";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  type: string;
  data?: string[];
  onClose: () => void;
}

interface Location {
  id: string;
  name: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
  url: string;
}

interface Specie {
  id: string;
  name: string;
  classification: string;
  eye_colors: string;
  hair_colors: string;
  url: string;
  people: string[];
  films: string[];
}

interface Vehicle {
  id: string;
  name: string;
  description: string;
  vehicle_class: string;
  length: string;
  pilot: string;
  films: string[];
  url: string;
}

export interface PeopleModel {
  id: string;
  age: string;
  name: string;
  gender: string;
  eye_color: string;
  hair_color: string;
  films: string[];
  species: string;
  url: string;
}
function Modal({ type, data, onClose }: ModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [dataModal, setDataModal] = useState<
    PeopleModel[] | Vehicle[] | Location[] | Specie[]
  >([]);

  const vehiclesUrl = import.meta.env.VITE_GHIBLI_API_URL_VEHICLES;
  const peopleUrl = import.meta.env.VITE_GHIBLI_API_URL_PEOPLE;
  const speciesUrl = import.meta.env.VITE_GHIBLI_API_URL_SPECIES;

  const handleCloseModal = () => {
    onClose();
  };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const urlsToExclude = [vehiclesUrl, peopleUrl, speciesUrl];
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const responses = await Promise.all(
          data!.map((url) => fetch(url).then((response) => {setIsLoading(false); return response.json()}))
        );

        setDataModal(responses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (!urlsToExclude.some((url) => data![0] === url)) {
      console.log("fetch", data![0]);
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [data]);

  const [expandedItem, setExpandedItem] = useState<string | null>();
  const handleToggle = (id: string) => {
    return expandedItem === id ? setExpandedItem(null) : setExpandedItem(id);
  };

  const renderInfo = (value: PeopleModel | Vehicle | Specie | Location) => {
    console.log(value);
    switch (type) {
      case "People":
        {
          const peopleInfo = value as PeopleModel;
          console.log(value);

          return (
            peopleInfo && (
              <div className="people_details activate">
                <ul>
                  <li>
                    <b>Gender:</b> {peopleInfo.gender}
                  </li>
                  <li>
                    <b>Age:</b> {peopleInfo.age}
                  </li>
                  <li>
                    <b>Hair Color:</b> {peopleInfo.hair_color}
                  </li>
                  <li>
                    <b>Eye Color:</b> {peopleInfo.eye_color}
                  </li>
                  
                </ul>
              </div>
            )
          );
        }
        break;
      case "Species":
        {
          const specieInfo = value as Specie;
          console.log(specieInfo);
          return (
            specieInfo && (
              <div className="people_details activate">
                <ul>
                  <li>Classification: {specieInfo.classification}</li>
                  <li>Hair Colors: {specieInfo.hair_colors}</li>
                  <li>Eye Colors: {specieInfo.eye_colors}</li>
                </ul>
              </div>
            )
          );
        }
        break;
      case "Vehicles":
        {
          const vehicleInfo = value as Vehicle;
          console.log("veh");
          console.log(vehicleInfo);
          return (
            vehicleInfo && (
              <div className="people_details activate">
                <ul>
                  <li>Description: {vehicleInfo.description}</li>
                  <li>Vehicle class: {vehicleInfo.vehicle_class}</li>
                  <li>Length: {vehicleInfo.length}</li>
                </ul>
              </div>
            )
          );
        }
        break;
    }
  };

  return (
    <div className="modal" onClick={handleCloseModal}>
      <div className="modal_content" onClick={handleContentClick}>
      <div className="close-icon" onClick={handleCloseModal}><IoMdClose /></div>
        <h1>{type}</h1>
        <div>
          {
          isLoading ? (
            <div>Loading...</div>
          ) : dataModal.length === 0 ? (
            <div className="noData">
              <h1>No data..</h1>
            </div>
          )
        :
        (
          dataModal.map((value, index) => (
            <div key={index} className="people_info">
              <div
                className="people_name"
                onClick={() => handleToggle(value.id)}
              >
                {value.name}
              </div>
              {expandedItem === value.id && renderInfo(value)}
            </div>
          ))
        )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
