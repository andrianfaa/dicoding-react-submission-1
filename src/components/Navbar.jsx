export default function Navbar({
  onInputChange,
  inputValue,
}) {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="navbar__brand">
          Notes.
        </h1>

        <input
          type="search"
          value={inputValue}
          onChange={onInputChange}
          className="navbar__input"
          placeholder="Search notes..."
        />
      </div>
    </nav>
  );
}
