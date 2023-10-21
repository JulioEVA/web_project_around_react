import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Verificando si el usuario actual es el propietario de la tarjeta actual
  const isOwn = props.card.owner._id === currentUser._id;

  // Creando una variable que después se establecerá en `className` para el botón eliminar
  const cardDeleteButtonClassName = `button ${
    isOwn ? "delete-button" : "delete-button_inactive"
  }`;

  // Verifica si el usuario actual le dio "like" a la tarjeta
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  // Crea una variable que después se establecerá en `className` para el botón like
  const cardLikeButtonClassName = `${isLiked ? "like_active" : "like"}`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card, isLiked);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card, isOwn);
  }

  return (
    <div className="element">
      <img
        onClick={handleClick}
        className="element__image"
        src={props.card.link}
        alt="Imagen proporcionada por el usuario"
      />
      <button onClick={handleDeleteClick} className={cardDeleteButtonClassName}>
        <img
          src={require("../images/delete-button.png")}
          alt="Icono de borrar"
        />
      </button>
      <h3 className="element__title text">{props.card.name}</h3>
      <button onClick={handleLikeClick} className="like-button button">
        <img
          className={cardLikeButtonClassName}
          src={require("../images/like-button.png")}
          alt="Icono de corazón"
        />
        <div className="like-counter">{props.card.likes.length}</div>
      </button>
    </div>
  );
}

export default Card;
