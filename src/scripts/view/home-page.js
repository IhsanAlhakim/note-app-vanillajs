import { notes } from "../data/state.js";
import { CONFIG } from "../globals/config.js";
import { renderNotes } from "../utils/render-notes.js";

const Home = {
  render() {
    return `
    <div class="home-header">
      <div class="home-title">
        <h2>Your Notes</h2>
      </div>
      <div class="add-search-container">
        <input class="search-input" type="text" placeholder="Search Notes..." />
        <button class="add-btn">Add Note</button>
      </div>
    </div>
      <section class="notes-container">
      </section>
      <div class="overlay">
      <div class="form-container">
        <h2 class="form-title">Add a New Note</h2>
        <button class="close-btn">&times;</button>
        <form action="" id="note-form">
          <div class="form-group">
            <label for="title">Note Title</label>
            <input type="hidden" name="noteId" id="noteId" value="" />
            <input
              type="text"
              id="title"
              class="input-title"
              name="title"
              placeholder="Enter note title"
              required
            />
          </div>
          <div class="form-group">
            <label for="content">Note Content</label>
            <textarea
              id="content"
              name="content"
              class="input-content"
              rows="5"
              placeholder="Enter note content"
              required
            ></textarea>
            <button type="submit" class="submit-btn">Add Note</button>
          </div>
        </form>
      </div>
    </div>
    <div class="note-detail-overlay">
      <div class="note-detail">
        <button class="note-detail-close">&times;</button>
        <h2 class="note-detail-title"></h2>
        <div class="note-detail-content"></div>
      </div>
    </div>;
  `;
  },

  afterRender() {
    function isStorageExist() {
      if (typeof Storage === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false;
      }
      return true;
    }

    if (isStorageExist) {
      renderNotes();
    }

    const addNoteButton = document.querySelector(".add-btn");
    const overlayContainer = document.querySelector(".overlay");
    const formTitle = document.querySelector(".form-title");
    const submitNoteButton = document.querySelector(".submit-btn");
    addNoteButton.addEventListener("click", () => {
      overlayContainer.style.display = "flex";
      formTitle.innerText = "Add Note";
      submitNoteButton.innerText = "Add Note";
    });

    const closeOverlayButton = document.querySelector(".close-btn");
    closeOverlayButton.addEventListener("click", () => {
      overlayContainer.style.display = "none";
      const formNoteTitle = document.getElementById("title");
      const formNoteContent = document.getElementById("content");
      const formNoteId = document.getElementById("noteId");
      formNoteTitle.value = "";
      formNoteContent.value = "";
      formNoteId.value = "";
    });

    const noteForm = document.getElementById("note-form");
    noteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const noteTitle = document.getElementById("title");
      const noteContent = document.getElementById("content");
      const formNoteId = document.getElementById("noteId");
      if (formNoteId.value !== "") {
        const noteList = notes.get();
        const noteIndex = noteList.findIndex(
          (note) => note.id === Number(formNoteId.value)
        );
        const note = noteList[noteIndex];
        const editedNote = {
          id: Number(formNoteId.value),
          title: noteTitle.value,
          content: noteContent.value,
          createdAt: note.createdAt,
          updatedAt: new Date().toISOString(),
        };
        if (isStorageExist()) {
          noteList[noteIndex] = editedNote;
          localStorage.setItem(
            CONFIG.localStorageKey,
            JSON.stringify(noteList)
          );
          overlayContainer.style.display = "none";
          renderNotes();
        }
      } else {
        const noteId = Date.now();
        const createdAt = new Date().toISOString();

        const newNote = {
          id: noteId,
          title: noteTitle.value,
          content: noteContent.value,
          createdAt: createdAt,
          updatedAt: createdAt,
        };

        if (isStorageExist()) {
          const noteList = notes.get();
          noteList.push(newNote);
          localStorage.setItem(
            CONFIG.localStorageKey,
            JSON.stringify(noteList)
          );
          overlayContainer.style.display = "none";
          renderNotes();
        }
      }

      noteTitle.value = "";
      noteContent.value = "";
      formNoteId.value = "";
    });

    const searchInput = document.querySelector(".search-input");
    searchInput.addEventListener("keyup", () => {
      if (searchInput.value === "") {
        renderNotes();
      } else {
        const noteList = notes.get();
        const searchInputValue = searchInput.value;
        const filteredNotes = noteList.filter(
          (note) =>
            note.title.toUpperCase().includes(searchInputValue.toUpperCase()) ||
            note.content.toUpperCase().includes(searchInputValue.toUpperCase())
        );
        if (filteredNotes.length < 1) {
          const contentContainer = document.querySelector(".notes-container");
          contentContainer.innerHTML = `<div class='no-note'><h3>The note you want is not found...</h3></div>`;
          return;
        }
        renderNotes(filteredNotes);
      }
    });

    const closeNoteDetail = document.querySelector(".note-detail-close");
    closeNoteDetail.addEventListener("click", () => {
      const noteDetailOverlay = document.querySelector(".note-detail-overlay");
      noteDetailOverlay.style.display = "none";
      const noteDetailTitle = document.getElementById("note-detail-title");
      const noteDetailContent = document.getElementById("note-detail-content");
      noteDetailTitle.value = "";
      noteDetailContent.value = "";
    });
  },
};

export default Home;
