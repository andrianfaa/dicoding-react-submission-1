import { useState } from "react";

export default function Form({
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    title: "",
    note: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    // eslint-disable-next-line prefer-regex-literals
    const pattern = new RegExp(/^[a-zA-Z0-9 ]*$/);

    if (name === "title" && value.length > 50) return;

    if (pattern.test(value)) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData.title, formData.note);
  };

  return (
    <form className="form text-center" onSubmit={handleOnSubmit}>
      <h2>Tambah Catatan</h2>

      <div className="form--group">
        <label htmlFor="title">
          Sisa karakter: {50 - formData.title.length}
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Masukkan judul catatan"
          name="title"
          value={formData.title}
          onChange={handleOnChange}
        />
      </div>
      <textarea
        className="form-control"
        rows="5"
        placeholder="Masukkan catatan"
        name="note"
        value={formData.note}
        onChange={handleOnChange}
      />

      <button type="submit" className="button">Simpan</button>
    </form>
  );
}
