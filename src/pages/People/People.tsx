import { ChangeEvent, useEffect, useState } from 'react'
import { PeopleModel } from '../../components/modal/Modal';

function People() {
    const peopleUrl = import.meta.env.VITE_GHIBLI_API_URL_PEOPLE;
    const [people, setPeople] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(()=> {
        const getPeople = async () => {
            try {
              fetch(peopleUrl)
                .then((response) => response.json())
                .then((data) => {
                  setPeople(data);
                });
            } catch (error) {
              console.error(error);
            }
          };

          getPeople();
    
    }, [])

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearch(event.target.value);
      }
  return (
    <div className="container_data">
        <input type="search" name="" id="" placeholder="Search people..." value={search} onChange={handleSearch} />
      <div className="wrapper_data">
      {people.filter((person:PeopleModel) => {
        if(!person) return true;
        return person.name.toLowerCase().includes(search.toLowerCase());
      }).map((value: PeopleModel, index) => (
          <div className="div_data" key={index}>
            {<h1>{value.name}</h1>}
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default People