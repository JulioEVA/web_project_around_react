import React from "react";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();
  const [currentUser, setCurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);

  /**
   * Stores the given card in the state variable.
   * @param {*} card The card that is to be stored.
   */
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  /**
   * Changes the state variable status in order to open the given popup
   */
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  /**
   * Changes the state variable status in order to open the given popup
   */
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  /**
   * Changes the state variable status in order to open the given popup
   */
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  /**
   * Closes all the popups by restoring the states variables to its default values.
   */
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard("");
  }

  /**
   * Sets the user info through the API given the parameter user
   * @param {*} user The user with the updated info
   */
  function handleUpdateUser(user) {
    api.setUserInfo(user).then((updatedUser) => {
      setCurrentUser(updatedUser);
      closeAllPopups();
    });
  }

  /**
   * Changes the avatar photo by the given link
   * @param {*} avatar An object containing the link to the new picture
   */
  function handleUpdateAvatar({ avatar }) {
    api.updateUserAvatar(avatar).then((updatedUser) => {
      setCurrentUser(updatedUser);
      closeAllPopups();
    });
  }

  /**
   * Handles the like interaction when a user likes a card
   * @param {*} card The card that was liked
   * @param {*} isLiked Value that determines whether or not the card was previously liked
   */
  function handleCardLike(card, isLiked) {
    //Envía una petición a la API y obteón los datos actualizados de la tarjeta
    if (!isLiked) {
      api.likeCard(card._id).then((newCard) => {
        _refreshCards(card, newCard);
      });
    } else {
      api.dislikeCard(card._id).then((newCard) => {
        _refreshCards(card, newCard);
      });
    }
  }

  /**
   * Refreshes the array of cards by replacing the card with the newCard
   * @param {*} card The card that was liked
   * @param {*} newCard The card with the like info updated
   */
  function _refreshCards(card, newCard) {
    setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
  }

  /**
   * Handles the request to delete a card
   * @param {*} card The card to delete
   * @param {*} isOwn Whether or not the card belongs to the current user
   */
  function handleCardDelete(card, isOwn) {
    if (isOwn) {
      api.deleteCard(card._id).then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      });
    }
  }

  function handleAddPlaceSubmit(card) {
    api.createCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  }

  /**
   * Initially calls the API in order to get the current user.
   */
  React.useEffect(() => {
    api.getUserInfo().then((user) => {
      setCurrentUser(user);
    });
  }, []);

  /**
   * Gets the saved cards and stores them in the state variable.
   */
  React.useEffect(() => {
    api.getInitialCards().then((cards) => {
      setCards(cards);
    });
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onCardClick={handleCardClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          cards={cards}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
        />
        <Footer />
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
        <dialog className="popup confirmation-popup">
          <button className="close-button button">
            <img
              src={require("../images/close-button.png")}
              alt="Icono de una X"
            />
          </button>
          <h2 className="confirmation-popup__title text">¿Estás seguro?</h2>
          <button className="save-button button" type="submit">
            Sí
          </button>
        </dialog>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
