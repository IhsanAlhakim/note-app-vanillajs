import { notes } from "../data/state.js";
import { CONFIG } from "../globals/config.js";
import { dateOnly } from "./date-format.js";
import { renderNotes } from "./render-notes.js";

function makeNote(note) {
  const noteCard = document.createElement("div");
  noteCard.classList.add("note-card");

  const noteHeader = document.createElement("div");
  noteHeader.classList.add("note-header");
  const noteTitle = document.createElement("h2");
  noteTitle.classList.add("note-title");
  noteTitle.innerText = note.title;
  const noteActions = document.createElement("div");
  noteActions.classList.add("note-actions");
  const editButton = document.createElement("button");
  editButton.classList.add("edit-btn");
  editButton.innerText = "✏️";
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.innerText = "🗑️";

  editButton.addEventListener("click", (e) => {
    e.stopPropagation();
    const overlayContainer = document.querySelector(".overlay");
    overlayContainer.style.display = "flex";
    const formTitle = document.querySelector(".form-title");
    formTitle.innerText = "Edit Note";
    const submitNoteButton = document.querySelector(".submit-btn");
    submitNoteButton.innerText = "Edit Note";
    const formNoteTitle = document.getElementById("title");
    const formNoteContent = document.getElementById("content");
    const formNoteId = document.getElementById("noteId");
    formNoteTitle.value = note.title;
    formNoteContent.value = note.content;
    formNoteId.value = note.id; // ini string, kalau dibandingin langsung sama note.id false. pakai fungsi Number
  });
  deleteButton.addEventListener("click", (e) => {
    e.stopPropagation();
    if (confirm("apakah anda ingin menghapus note ini?")) {
      let noteList = notes.get();
      notes.set(noteList.filter((selectedNote) => selectedNote.id !== note.id));
      localStorage.setItem(CONFIG.localStorageKey, JSON.stringify(notes.get()));
      renderNotes();
    }
  });

  noteActions.append(editButton, deleteButton);
  noteHeader.append(noteTitle, noteActions);

  const noteBody = document.createElement("div");
  noteBody.classList.add("note-body");
  const noteContent = document.createElement("p");
  noteContent.classList.add("note-content");
  noteContent.innerText = note.content;

  noteBody.append(noteContent);

  const noteFooter = document.createElement("div");
  noteFooter.classList.add("note-footer");
  const noteDate = document.createElement("span");
  noteDate.classList.add("note-date");
  noteDate.innerText = dateOnly(note.createdAt);

  noteFooter.append(noteDate);

  noteCard.append(noteHeader, noteBody, noteFooter);

  noteCard.addEventListener("click", () => {
    const noteDetailOverlay = document.querySelector(".note-detail-overlay");
    noteDetailOverlay.style.display = "flex";
    const noteDetailTitle = document.querySelector(".note-detail-title");
    const noteDetailContent = document.querySelector(".note-detail-content");
    noteDetailTitle.innerText = note.title;
    noteDetailContent.innerText = note.content;
  });

  return noteCard;
}

export default makeNote;
