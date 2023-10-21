function Header() {
  return (
    <header className="header">
      <img
        src={require("../images/logo.png")}
        alt="Page's logo"
        className="logo"
      />
      <hr className="header__separator" />
    </header>
  );
}

export default Header;
