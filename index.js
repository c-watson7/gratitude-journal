import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://gratitude-app-d149d-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const entriesListInDB = ref(database, "gratitudeJournal")

let textEl = document.getElementById("text-input")
let publishBtnEl = document.getElementById("publish-btn")
let entriesListEl = document.getElementById("entries-list")

publishBtnEl.addEventListener("click", function() {
    let inputValue = textEl.value
    console.log("clicked")
    push(entriesListInDB, inputValue)
    textEl.value = ""
})

onValue(entriesListInDB, (snapshot) => {
     if(snapshot.exists) {
        let entriesArray = Object.entries(snapshot.val())
        entriesArray.reverse()
        clearEntries()
        for(let i = 0; i < entriesArray.length; i++) {
            let currentEntry = entriesArray[i]
            addEntryToList(currentEntry)
        }

    } else {
        entriesListEl.innerHTML = `<p>No entries..</p>`
    }
})

function clearEntries() {
    entriesListEl.innerHTML = ""
}

function addEntryToList(entry) {
    let entryID = entry[0]
    let entryText = entry[1]

    let newEl = document.createElement("p")
    newEl.classList.add("entry")

    newEl.innerText = entryText

    entriesListEl.appendChild(newEl)
}