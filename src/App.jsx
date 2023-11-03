import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import AddProducts from "./components/addproducts/AddProducts";
import CardBody from "./components/cards/CardBody";
import Button from "./components/button/Button";

import "./App.css";
const App = () => {
  const [items, setItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [addedItems, setAddedItem] = useState([]);
  const [showAddProducts, setShowAddProducts] = useState(false);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/search/movie?api_key=6fbd29657d5518e0acaf2655425b32fb&query=Harry+Potter")
      .then((res) => res.json())
      .then((data) => {
        // Asegúrate de que data.results sea un arreglo antes de almacenarlo en el estado.
        if (Array.isArray(data.results)) {
          setItem(data.results);
        }
      });
    console.count("hi");
  }, []);
  
  const itmesFilter = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  function addItem(item) {
    item.addNumber = 1;
    const itemArr = addedItems;
    setAddedItem([...itemArr, item]);
  }
  // console.log(addedItems);
  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItem(newItems);
    // console.log(addedItems);
  }
  
  return (
    <div>
      {/* <Header /> */}

      <div className="body__container">
        <div className="nav">
          <Header />
          <div className="nav-right">
         
            <Button num={addedItems.length} click={setShowAddProducts} />
          </div>
        </div>
         <br />
         <br />
        {showAddProducts && (

          <AddProducts
            click={setShowAddProducts}
            items={addedItems}
            removeItem={removeItem}
            setAddedItem={setAddedItem}
          />
        )}
        <CardBody
          products={itmesFilter}
          addItem={addItem}
          removeItem={removeItem}
          addedItems={addedItems}
        />
      </div>
    </div>
  );
};

export default App;
