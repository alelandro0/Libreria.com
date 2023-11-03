import React from "react";
import "./Button.css";
const Button = ({ num, click }) => {
  return (
    <button className="ui-change-btn" onClick={() => click(true)}>
     LIBROS<span className="libro">{num}</span> <img className="carri" src="../public/img/anadir-al-carrito.png" alt="Imagen" />
    </button>
  );
};

export default Button;
