
const notesContainer = document.querySelector(".note-container");
const createBtn = document.querySelector(".btn");

// Function to display notes from localStorage
function showNotes() {
    const savedNotes = localStorage.getItem("notes");
    notesContainer.innerHTML = savedNotes ? savedNotes : ""; // Handle null case for new users
}
showNotes();

// Function to update localStorage with current notes
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML); // Fixed key name from "name" to "notes"
}

// Event listener to create a new note
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "clean-notes.png";

    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    updateStorage(); // Update localStorage after creating a new note
});

// Event listener for interactions inside the notes container
notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove(); // Remove the note
        updateStorage(); // Update localStorage after deletion
    } else if (e.target.tagName === "P") {
        // Ensure the correct behavior when editing notes
        notesContainer.querySelectorAll(".input-box").forEach(note => {
            note.oninput = function () {
                updateStorage();
            };
        });
    }
});

// Prevent default behavior of "Enter" key to insert line break
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && document.activeElement.isContentEditable) {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
