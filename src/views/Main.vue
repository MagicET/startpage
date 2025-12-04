<script setup>
import { inject, ref, computed } from 'vue';
import UrlBar from '../components/UrlBar.vue';
import Bookmark from '../components/Bookmark.vue';
import ReadingList from '../components/ReadingList.vue';

const { urlBox, changeUrlBox } = inject("urlBox");

const { readingLists, addReadingList, deleteReadingList, moveReadingListTop } = inject("readingLists");

let openedReadingList = ref("");

function changeOpenedReadingList(url) {
  if (openedReadingList.value == url) {
    openedReadingList.value = "";
  } else {
    openedReadingList.value = url;
  }
}

const { bookmarks, addBookmark, changeBookmark, deleteBookmark } = inject("bookmarks");

const editingBookmark = ref("");
const newUrl = ref("");
const newIcon = ref("");
const newName = ref("")
function openBookmarkDialog(url, icon, name) {
  const bookmarkEditingDialog = document.getElementById("bookmarkEditingDialog");
  newUrl.value = url;
  newName.value = name;
  newIcon.value = icon;
  editingBookmark.value = url;
  bookmarkEditingDialog.showModal()
}
function closeBookmarkDialog() {
  const newBookmark = { name: newName.value, text: newUrl.value, icon: newIcon.value };
  const bookmarkIndex = bookmarks.value.findIndex((bookmark) => bookmark.text == editingBookmark.value);
  changeBookmark(bookmarkIndex, newBookmark);
  const bookmarkEditingDialog = document.getElementById("bookmarkEditingDialog");
  bookmarkEditingDialog.close();
}
</script>

<style scoped>
  .main {
    display: grid;
    width: 100vw;
    max-height: 100vh;
    grid-template-rows: minmax(0, auto) minmax(0, 1fr);
    box-sizing: border-box;
    padding: 3vh;
    padding-bottom: 3em;
  }

  .personalUrls {
    width: 100%;
    max-width: 36em;
    margin: 0 auto;
    overflow-y: scroll;
    scrollbar-width: none;
  }

  .bookmarks {
    -ms-overflow-style: none;
    display: grid;
    margin-top: 0.5em;
    margin-bottom: 3vh;
    grid-template-columns: repeat(auto-fit, minmax(5em, 1fr));
    column-gap: 0.5em;
    grid-auto-rows: auto;
    row-gap: 0.5em;
    overflow-x: clip;
  }
  
  .readingLists {
    background-color: var(--secBgColor);
    max-height: 20vh;
    padding: 0.8em 1em;
    border-radius: 1.5rem;
    overflow-x: clip;
    overflow-y: auto;
    box-sizing: border-box;
  }

  #bookmarkEditingDialog {
    border: none;
    background-color: var(--priBgColor);
    border-radius: 1.5rem;
    padding: 1em;
    color: var(--bodyColor);

    &::backdrop {
      background-color: #0008;
    }

    .fields{
      display: grid;
      grid-template-columns: minmax(0, auto) minmax(0, auto);
      row-gap: 0.5em;
      column-gap: 1em;
    }

    .buttonRibbon {
      padding-top: 1em;
      display: grid;
      grid-template-columns: minmax(0, auto) minmax(0, 1fr) minmax(0, auto);

      .deleteButton {
        color: #f44336;
      }
    }
  }
</style>

<template>
  <div class="main">
    <UrlBar></UrlBar>
    <div class="personalUrls">
      <div class="readingLists">
        <ReadingList v-for="readingList in readingLists" :key="readingList" :url="readingList" :opened="openedReadingList" @delete="deleteReadingList(readingList)" @moveUp="moveReadingListTop(readingList)" @open="changeOpenedReadingList(readingList)"></ReadingList>
      </div>
      <div class="bookmarks">
        <Bookmark class="bookmark" v-for="bookmark in bookmarks" :key="bookmark.text" :name="bookmark.name" :url="bookmark.text" :icon="bookmark.icon" @delete="deleteBookmark(bookmark.text)" @update="openBookmarkDialog(bookmark.text, bookmark.icon, bookmark.name)"></Bookmark>
      </div>
    </div>
  </div>

  <dialog id="bookmarkEditingDialog">
    <p style="margin: 0; margin-bottom: 0.5em; text-align: center;">Edit Bookmark</p>
    <div class="fields">
      <label>Icon</label>
      <input type="text" v-model="newIcon">
      <label class="dialogLabel">Name</label>
      <input type="text" v-model="newName">
      <label class="dialogLabel">URL</label>
      <input type="text" v-model="newUrl">
    </div>
    <div class="buttonRibbon">
      <button @click="deleteBookmark(editingBookmark)" class="iconButton deleteButton"><span class="material-symbols-outlined">delete</span></button>
      <div></div>
      <button @click="closeBookmarkDialog" class="generalButton">OK</button>
    </div>
  </dialog>
</template>
