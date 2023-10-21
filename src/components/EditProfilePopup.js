import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);
  /**
   * Updates the value of the state variable description whenever the about-input changes.
   * @param {*} e The change event
   */
  function handleChange(e) {
    setDescription(e.target.value);
  }

  // Después de cargar el usuario actual desde la API
  // sus datos serán usados en componentes gestionados.
  React.useEffect(() => {
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e, name) {
    // Evita que el navegador navegue hacia la dirección del formulario
    e.preventDefault();

    // Pasa los valores de los componentes gestionados al controlador externo
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <>
      <PopupWithForm
        onSubmit={handleSubmit}
        className="edit-popup form-popup"
        title="Editar perfil"
        inputId="name-input"
        placeholder="Nombre"
        saveButtonText="Guardar"
        inputMaxLength="40"
        inputType="text"
        isOpen={isOpen}
        onClose={onClose}
      >
        <input
          onChange={handleChange}
          id="about-input"
          minLength="2"
          maxLength="200"
          required
          className="input"
          type="text"
          placeholder="Acerca de mí"
          value={currentUser.about}
        />
        <span className={`form__input-error about-input-error text`}></span>
      </PopupWithForm>
    </>
  );
}

export default EditProfilePopup;
