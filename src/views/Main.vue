<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router'
import Bookmark from '../components/Bookmark.vue';
import ReadingList from '../components/ReadingList.vue';

const urlBox = ref("");

function saveUrlBox() {
  localStorage.setItem("urlBox", urlBox.value);
}

function loadUrlBox() {
  const url = localStorage.getItem("urlBox");
  if(url) {
    urlBox.value = url
  }
}

const computedUrl = computed(() => {
  if(urlBox.value.includes("http")) {
    return urlBox.value
  } else {
    return "//" + urlBox.value
  }
});

function deleteUrlBox() {
  urlBox.value = "";
  saveUrlBox();
}

const isUrlBoxDeletable = computed(() => {
  return urlBox.value != "";
})

const search = computed(() => {
  return "https://www.google.com/search?q=" + urlBox.value
});

const isBookmarkUnpushable = computed(() => {
  let result = urlBox.value == ""
  result = result || bookmarks.value.some((bookmark) => bookmark.text == urlBox.value);
  return result;
})

const isReadingListUnpushable = computed(() => {
  let result = urlBox.value == ""
  result = result || readingLists.value.includes(urlBox.value);
  return result;
})


const readingLists = ref([]);

const bookmarks = ref([]);


function setBookmark() {
  let newBookmark = { name: urlBox.value, text: urlBox.value, icon: "🌐" };
  bookmarks.value.push(newBookmark);
  saveBookmarks();
}

function deleteBookmark(url) {
  const bookmarkEditDialog = document.getElementById("bookmarkEditDialog");
  bookmarks.value = bookmarks.value.filter((bookmark) => bookmark.text != url);
  bookmarkEditDialog.close();
  saveBookmarks();
}

function saveBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks.value));
}

function loadBookmarks() {
  const storage = localStorage.getItem("bookmarks");
  if(storage) {
    bookmarks.value = JSON.parse(storage)
  } else {
    bookmarks.value = [{ name: "Add bookmarks",text: "https://example.com", icon: "🌐" }]
    saveBookmarks()
  }
}


function addReadingList() {
  readingLists.value.push(urlBox.value);
  saveReadingLists()
}

function deleteReadingList(url) {
  readingLists.value = readingLists.value.filter((readingList) => readingList != url);
  saveReadingLists()
}

function saveReadingLists() {
  localStorage.setItem("readingLists", JSON.stringify(readingLists.value));
}

function loadReadingLists() {
  const storage = localStorage.getItem("readingLists");
  if(storage) {
    readingLists.value = JSON.parse(storage)
  } else {
    readingLists.value = ["https://example.com"]
    saveReadingLists()
  }
}

const editingBookmark = ref("");
const newUrl = ref("");
const newIcon = ref("");
const newName = ref("")
function openBookmarkDialog(url, icon, name) {
  const bookmarkEditDialog = document.getElementById("bookmarkEditDialog");
  newUrl.value = url;
  newName.value = name;
  newIcon.value = icon;
  editingBookmark.value = url;
  bookmarkEditDialog.showModal()
}
function closeBookmarkDialog() {
  const newBookmark = { name: newName.value, text: newUrl.value, icon: newIcon.value };
  const bookmarkIndex = bookmarks.value.findIndex((bookmark) => bookmark.text == editingBookmark.value);
  bookmarks.value[bookmarkIndex] = newBookmark;
  saveBookmarks();
  const bookmarkEditDialog = document.getElementById("bookmarkEditDialog");
  bookmarkEditDialog.close();
}


loadBookmarks()
loadUrlBox()
loadReadingLists()
</script>

<style>
  .main {
    display: grid;
    width: 100vw;
    max-height: 100vh;
    grid-template-rows: minmax(0, auto) minmax(0, 1fr);
  }
  input::placeholder, button:disabled {
    color: rgba(var(--bodyColorValue), 0.5);
  }
  button:disabled span {
    font-variation-settings:
      'FILL' 1,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24;
  }
  .toolbar {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, auto) minmax(0, auto) minmax(0, auto) minmax(0, auto) minmax(0, auto);
    align-items: center;
    margin: 3vh auto;
    width: 50%;
    min-width: 16em;
    padding: 0.5em 0.8em;
    border: none;
    border-radius: 100000px;
    font-size: 1.2em;
    background-color: var(--secBgColor);
  }
  .transparent {
    outline: none;
    border: none;
    background: none;
    padding: 0.1em 0.2em;
    margin: 0;
    border-radius: 0;
    color: var(--bodyColor);
  }
  #urlBoxDelete {
    font-size: 1.0em;
    font-variation-settings:
      'FILL' 1,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24;
    margin: 0 0.1em
  }

  .personalUrls {
    width: 80%;
    margin: 0 auto;
    overflow-y: scroll;
    scrollbar-width: none;
  }

  .bookmarks {
    -ms-overflow-style: none;
    display: grid;
    margin-top: 1em;
    margin-bottom: 10vw;
    grid-template-columns: repeat(auto-fit, minmax(5em, 1fr));
    column-gap: 0.5em;
    grid-auto-rows: auto;
  }
  
  .readingLists {
    max-height: 5em;
    padding: 0 0.1em;
    overflow: scroll;
  }


  .settingButton {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
  }

  dialog {
    border: none;
    background-color: var(--priBgColor);
    border-radius: 1em;
    padding: 1em;
    color: var(--bodyColor);
  }
  dialog::backdrop {
    background-color: #0008;
  }
  .bookmarkEditTypeBox {
    display: grid;
    grid-template-columns: minmax(0, auto) minmax(0, auto);
    row-gap: 0.5em;
    column-gap: 1em;
  }
  .deleteButton {
    color: #f44336;
  }
  #buttonRibbon {
    padding-top: 1em;
    display: grid;
    grid-template-columns: minmax(0, auto) minmax(0, 1fr) minmax(0, auto)
  }
</style>

<template>
  <div class="main">
    <div class="toolbar">
      <input type="text" class="transparent" v-model="urlBox" placeholder="Type URL" @input="saveUrlBox"/>

      <button @click="deleteUrlBox" v-if="isUrlBoxDeletable">
        <span class="material-symbols-outlined" id="urlBoxDelete">
          cancel
        </span>
      </button>

      <a :href="computedUrl">
        <span class="material-symbols-outlined">
          link
        </span>
      </a>

      <a :href="search">
        <span class="material-symbols-outlined">
          search
        </span>
      </a>

      <button @click="addReadingList" :disabled="isReadingListUnpushable">
        <span class="material-symbols-outlined">
          bookmark_add
        </span>
      </button>

      <button @click="setBookmark" :disabled="isBookmarkUnpushable">
        <span class="material-symbols-outlined">
          star
        </span>
      </button>
    </div>
    <div class="personalUrls">
      <div class="readingLists">
        <ReadingList v-for="readingList in readingLists" :key="readingList" :url="readingList" @delete="deleteReadingList(readingList)"></ReadingList>
      </div>
      <div class="bookmarks">
        <Bookmark class="bookmark" v-for="bookmark in bookmarks" :key="bookmark.text" :name="bookmark.name" :url="bookmark.text" :icon="bookmark.icon" @delete="deleteBookmark(bookmark.text)" @update="openBookmarkDialog(bookmark.text, bookmark.icon, bookmark.name)"></Bookmark>
      </div>
    </div>

    <RouterLink to="/settings" class="settingButton">
      <span class="material-symbols-outlined">
        settings
      </span>
    </RouterLink>
  </div>

  <dialog id="bookmarkEditDialog">
    <p style="margin: 0; margin-bottom: 0.5em; text-align: center;">Edit Bookmark</p>
    <div class="bookmarkEditTypeBox">
      <label class="dialogLabel">Icon</label>
      <input type="text" class="dialogTextField" v-model="newIcon">
      <label class="dialogLabel">Name</label>
      <input type="text" class="dialogTextField" v-model="newName">
      <label class="dialogLabel">URL</label>
      <input type="text" class="dialogTextField" v-model="newUrl">
    </div>
    <div id="buttonRibbon">
      <button @click="deleteBookmark(editingBookmark)" class="iconButton deleteButton"><span class="material-symbols-outlined">delete</span></button>
      <div></div>
      <button @click="closeBookmarkDialog" class="generalButton">OK</button>
    </div>
  </dialog>
</template>
