/* eslint-disable max-len */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Container from "./components/Container";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import { useDebounce } from "./hooks";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [notes, setNotes] = useState([
    {
      id: uuidv4(),
      title: "Babel",
      body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
      archived: false,
      createdAt: "2022-04-14T04:27:34.572Z",
    },
    {
      id: uuidv4(),
      title: "Functional component",
      body: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.",
      archived: false,
      createdAt: "2022-04-14T04:27:34.572Z",
    },
    {
      id: uuidv4(),
      title: "Modularization",
      body: "Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.",
      archived: false,
      createdAt: "2022-04-14T04:27:34.572Z",
    },
  ]);

  const debouncedKeyword = useDebounce(keyword, 500);

  const activeNotes = notes.filter((note) => !note.archived);
  const archiveNotes = notes.filter((note) => note.archived);
  // Filtered notes based on keyword
  const filteredActiveNotes = activeNotes.filter((note) => note.title.toLowerCase().includes(debouncedKeyword.toLowerCase()));
  const filteredArchiveNotes = archiveNotes.filter((note) => note.title.toLowerCase().includes(debouncedKeyword.toLowerCase()));

  const handleOnSearch = (event) => {
    const { value } = event.target;
    // eslint-disable-next-line prefer-regex-literals
    const pattern = new RegExp(/^[a-zA-Z0-9 ]*$/);

    if (pattern.test(value)) setKeyword(value);
  };

  const handleOnDrop = (id) => {
    const findNote = notes.find((note) => note.id === id);
    if (!findNote) return;

    setNotes((prevState) => prevState.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          archived: !note.archived,
        };
      }

      return note;
    }));
  };

  const handleClickMove = (id) => {
    const findNote = notes.find((note) => note.id === id);
    if (!findNote) return;

    setNotes((prevState) => prevState.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          archived: !note.archived,
        };
      }

      return note;
    }));
  };

  const handleClickDelete = (id) => {
    const findNote = notes.find((note) => note.id === id);
    if (!findNote) return;

    setNotes((prevState) => prevState.filter((note) => note.id !== id));
  };

  const handleAddNote = (title, note) => {
    setNotes((prevState) => [
      ...prevState,
      {
        id: uuidv4(),
        title,
        body: note,
        archived: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    setIsFormOpen(false);
  };

  return (
    <>
      <Navbar onInputChange={handleOnSearch} inputValue={keyword} />
      <div className="container">
        <button
          type="button"
          className="button button__custom"
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          {isFormOpen ? "Close" : "Add note"}
        </button>

        {isFormOpen && (
          <Form onSubmit={handleAddNote} />
        )}
      </div>

      <div className="layout">
        <Container
          title="Active Notes"
          moveButtonText="Arsipkan"
          onDrop={handleOnDrop}
          notes={filteredActiveNotes}
          onClickDelete={handleClickDelete}
          onClickMove={handleClickMove}
        />

        <Container
          title="Archive Notes"
          moveButtonText="Aktifkan"
          onDrop={handleOnDrop}
          notes={filteredArchiveNotes}
          onClickDelete={handleClickDelete}
          onClickMove={handleClickMove}
        />
      </div>
    </>
  );
}
