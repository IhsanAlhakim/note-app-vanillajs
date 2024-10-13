import { notes } from "../data/state.js";
import { CONFIG } from "../globals/config.js";
import makeNote from "./make-note.js";

export function renderNotes(notesData = []) {
  const contentContainer = document.querySelector(".notes-container");
  if (notesData.length > 0) {
    notes.set(notesData);
  } else {
    notesData = JSON.parse(localStorage.getItem(CONFIG.localStorageKey));
    if (notesData) {
      if (notesData.length > 0) {
        notes.set(notesData);
      } else {
        contentContainer.innerHTML =
          "<div class='no-note'><h3>You dont have any notes...</h3></div>";
        return;
      }
    } else {
      contentContainer.innerHTML =
        "<div class='no-note'><h3>You dont have any notes...</h3></div>";
      return;
    }
  }
  const noteList = notes.get();
  contentContainer.innerHTML = "";
  for (let i = noteList.length - 1; i >= 0; i--) {
    const noteItem = makeNote(noteList[i]);
    contentContainer.append(noteItem);
  }
}
