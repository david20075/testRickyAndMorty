import { useState } from "react";

const useListCharacters = () => {
  const ITEMS_BY_PAGE = 9;
  const [numberPage, setNumberPage] = useState(0);
  const [groupsPaginated, setGroupsPaginated] = useState<any>([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [objec, setObjec] = useState({});
  const getCharaters = async (page: number = 0, gender: string = "") => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&&gender=${gender}`
    );
    const responseJson = await response.json();
    const { results } = responseJson;
    return Promise.resolve(results);
  };
  const clientPagination = async (page: number = 0, gender = "") => {
    return new Promise(async (resolve) => {
      // const numberPageRecovery = parseInt(window.localStorage.getItem('numberPage'))
      // setNumberPage(numberPageRecovery || 0);
      let obj: any = {};
      const items = await getCharaters(page, gender);
      items.map((item: any) => {
        obj[item.id] = item;
      });
      const dataPresistene = localStorage.getItem('data')
      if (!gender) {
        obj = { ...objec, ...obj , ...JSON.parse(dataPresistene as string)};
      }
      const totalItems = Object.keys(obj).map((key) => obj[key]);
      let divideGroups = divideArrayIntoGroups(totalItems);
      
      window.localStorage.setItem("data", JSON.stringify(obj));
      window.localStorage.setItem("divideGroups", JSON.stringify(divideGroups));
      const data = localStorage.getItem('data')
      const divideG = localStorage.getItem('divideGroups')
      setGroupsPaginated(JSON.parse(divideG as string));
      setObjec(JSON.parse(data as string));
      resolve(true);
    });
  };
  const divideArrayIntoGroups = (arr: any): any => {
    var chunks = [],
      i = 0,
      n = arr.length;
    while (i < n) {
      chunks.push(arr.slice(i, (i += ITEMS_BY_PAGE)));
    }
    return chunks;
  };
  const handlePrevious = () => {
    if (numberPage - 1 > -1) {
      setNumberPage(numberPage - 1);
      setSelectedValue("");
      window.localStorage.setItem("numberPage",(numberPage -1).toString());
    }
  };
  const handleNext = async () => {
    setNumberPage(numberPage + 1);
    await clientPagination(numberPage + 1);
    setSelectedValue("");
    window.localStorage.setItem("numberPage", (numberPage+1).toString().toString());
  };
  const handleSelectChange = async (event: any) => {
    if (event.target.value) {
      console.log("se limpio", event.target.value);
      setSelectedValue(event.target.value);
      setNumberPage(0);
    }
    await clientPagination(numberPage, event.target.value);
    window.localStorage.setItem("numberPage", (numberPage-1).toString());
  };
  return {
    clientPagination,
    handlePrevious,
    handleNext,
    groupsPaginated,
    numberPage,
    handleSelectChange,
    selectedValue,
    setNumberPage,
    setGroupsPaginated
  };
};
export default useListCharacters;
