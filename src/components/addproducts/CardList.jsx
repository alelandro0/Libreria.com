import React, { useReducer, useEffect } from "react";
import "./CardList.css";

function reducer(state, action) {
  if (action.type === "INCREASE") {
    return {
      ...state,
      addNumber: state.addNumber + 1,
    };
  } else if (action.type === "DECREASE") {
    if (state.addNumber === 1) {
      return state;
    }
    return {
      ...state,
      addNumber: state.addNumber - 1,
    };
  }
}

const CardList = ({ item, removeItem, setAddedItem, itemsArr }) => {
  const [state] = useReducer(reducer, item);

  useEffect(() => {
    const newArr = itemsArr.map((itemArr) => {
      itemArr.id === item.id && (item.addNumber = state.addNumber);
      return itemArr;
    });
    setAddedItem(newArr);
  }, [state]);

  return (
    <div className="card-list-body">
    <button
      className="delete-btn"
      onClick={() => {
        document.querySelector(".card-list-body").classList.add("animate");
        setTimeout(() => removeItem(item), 190);
      }}
    >
      X
    </button>
    <div className="textImage">
      <h4 className="textH">{item.title}</h4>
      <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="card-list-img" />
    </div>
    <hr />
    <div className="card-list-add-minu-body">
      <div className="precio">
        <p>Precio: ${item.price}</p>
      </div>
      <div className="plus-items-minu">
        <div className="flex">
          <span className="num-of-items">{item.addNumber}</span> {/* Utiliza item.addNumber */}
        </div>
      </div>
    </div>
  </div>
  );
};

export default CardList;

