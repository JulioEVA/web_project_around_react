import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  /**
   * Handles the submitting of the Avatar popup form
   * @param {*} e The submit event
   * @param {*} inputRef The ref to the specific input
   */
  function handleSubmit(e, inputRef) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }
  return (
    <PopupWithForm
      className="avatar-popup"
      title="Cambiar foto de perfil"
      inputId="avatar-link"
      maxLength=""
      type="url"
      placeholder="Enlace a la imagen"
      saveButtonText="Guardar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default EditAvatarPopup;
