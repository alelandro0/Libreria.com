import React, { useEffect, useState } from "react";
import "./Card.css";

const Card = ({ product, addItem, addedItems }) => {
  const item = addedItems.find((addedItem) => addedItem.id === product.id);
  const [quantity, setQuantity] = useState(15); // Iniciar en 15
  const isSoldOut = quantity <= 0; // Cambiar la condición a 0
  const price = Math.floor(Math.random() * (100 - 10 + 1) + 10); // Precio aleatorio entre $10 y $100

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    } else {
      setQuantity(15); // Iniciar en 15
    }
  }, [item]);

  const handleAdd = () => {
    if (!isSoldOut) {
      addItem({ ...product, quantity: quantity -1, price });
      setQuantity(quantity - 1); // Disminuir la cantidad en 1
    }
  };
  
  return (
    <div className="card">
      <img className="card__img" src={`https://image.tmdb.org/t/p/w500${product.poster_path}`} alt={product.title} />
      <div>
        <div>
          <h4>{product.title}</h4>
          <h2>Cantidad: {isSoldOut ? "Agotado" : quantity}</h2>
          <p>{product.description}</p>
          <p>Precio: ${price}</p>
        </div>
        <div className="card-price-add">
          <button
            className={ "add-item-btn"}
            onClick={handleAdd}
            disabled={isSoldOut}
          >
            {isSoldOut ? "AGOTADO" : "AGREGAR"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;


