import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import AddProducts from "./components/addproducts/AddProducts";
import CardBody from "./components/cards/CardBody";
import Button from "./components/button/Button";

import "./App.css";

const App = () => {
  // Recuperar los datos almacenados en localStorage al cargar la página
  const storedItems = JSON.parse(localStorage.getItem("items")) || [];
  const storedAddedItems = JSON.parse(localStorage.getItem("addedItems")) || [];

  const [items, setItems] = useState(storedItems);
  const [searchValue, setSearchValue] = useState("");
  const [addedItems, setAddedItems] = useState(storedAddedItems);
  const [showAddProducts, setShowAddProducts] = useState(false);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/search/movie?api_key=6fbd29657d5518e0acaf2655425b32fb&query=Harry+Potter")
      .then((res) => res.json())
      .then((data) => {
        // Asegúrate de que data.results sea un arreglo antes de almacenarlo en el estado.
        if (Array.isArray(data.results)) {
          setItems(data.results);
          // Almacenar en localStorage cada vez que se actualiza 'items'
          localStorage.setItem("items", JSON.stringify(data.results));
        }
      });
  }, []);

  const itemsFilter = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  function addItem(item) {
    item.addNumber = 1;
    setAddedItems([...addedItems, item]);
  }

  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItems(newItems);
  }

  // Almacenar en localStorage cada vez que se actualiza 'addedItems'
  useEffect(() => {
    localStorage.setItem("addedItems", JSON.stringify(addedItems));
  }, [addedItems]);

  return (
    <div>
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
            setAddedItem={setAddedItems}
          />
        )}
        <CardBody
          products={itemsFilter}
          addItem={addItem}
          removeItem={removeItem}
          addedItems={addedItems}
        />
      </div>
    </div>
  );
};

export default App;
