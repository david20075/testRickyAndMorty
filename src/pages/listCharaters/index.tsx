import { useEffect, useState } from "react";
import Card from "../listCharaters/components/card/index";
import useListCharacters from "./hooks";
export function ListCharaters() {
  interface charater{
    id: string, 
    name: string, 
    image: string, 
    species: string, 
    gender: string 
  }
  const { 
    clientPagination,
    handlePrevious,
    handleNext,
    groupsPaginated,
    numberPage,
    handleSelectChange,
    selectedValue,
    setNumberPage,
    setGroupsPaginated
   } = useListCharacters();

  useEffect(() => {
    const fetchData = async () => {
      
      await clientPagination();
      const numberP = localStorage.getItem('numberPage')
      
      const numberPageRecovery:number = parseInt(numberP as string)|| 0;
      setNumberPage(numberPageRecovery);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="controls">
          <label>
            <select value={selectedValue} onChange={handleSelectChange}>
              <option value="">Seleccione una opción</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Genderless">Genderless</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <div className="pagination">
            <button className="button" onClick={handlePrevious} >Previous</button>
            <button className="button" onClick={handleNext}>Next</button>
          </div>
          </div>
          <ul className="cards">
            
            {(groupsPaginated[numberPage]?.length <1) && <p>Not found Results</p>}
            {groupsPaginated[numberPage]?.map(({id, name, image, species, gender }:charater) => (
              <Card
                key={id}
                id={id}
                name={name}
                image={image}
                species={species}
                gender={gender}
              />
            ))}
          </ul>
          <footer>
            <p>Author: Andres David Rodriguez</p>
          </footer>
        </div>
    </>
  );
}
