import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const inputRef = useRef(null);

  /**
   * Handles the submitting of a new card
   * @param {*} e the submit event
   */
  function handleSubmit(e, title) {
    e.preventDefault();
    onAddPlaceSubmit({ name: title, link: inputRef.current.value });
  }

  return (
    <PopupWithForm
      className="add-popup form-popup"
      title="Nuevo lugar"
      inputId="place-input"
      placeholder="Título"
      saveButtonText="Crear"
      inputMaxLength="30"
      inputType="text"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        id="link-input"
        minLength="2"
        required
        className="input"
        type="url"
        placeholder="Enlace a la imagen"
      />
      <span className={`form__input-error link-input-error text`}></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
