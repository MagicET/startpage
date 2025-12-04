<script setup>
import { ref, computed, provide } from 'vue';
import { RouterView } from 'vue-router'
import Tabs from './components/Tabs.vue';

const urlBox = ref("");

function changeUrlBox(url) {
  urlBox.value = url;
  localStorage.setItem("urlBox", urlBox.value);
}

function loadUrlBox() {
  const url = localStorage.getItem("urlBox");
  if (url) {
    urlBox.value = url;
  }
}

provide('urlBox', {
  urlBox,
  changeUrlBox
});


const readingLists = ref([]);

function addReadingList(url) {
  readingLists.value.splice(0, 0, url);
  saveReadingLists();
}

function deleteReadingList(url) {
  readingLists.value = readingLists.value.filter((readingList) => readingList != url);
  saveReadingLists();
}

function moveReadingListTop(url) {
  deleteReadingList(url);
  readingLists.value.splice(0, 0, url);
  saveReadingLists();
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

provide('readingLists', {
  readingLists,
  addReadingList,
  deleteReadingList,
  moveReadingListTop
});


const bookmarks = ref([]);

function setBookmark(name, text, icon) {
  let newBookmark = { name: name, text: text, icon: icon };
  bookmarks.value.push(newBookmark);
  saveBookmarks();
}

function changeBookmark(index, bookmark) {
  bookmarks.value[index] = bookmark;
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
    bookmarks.value = JSON.parse(storage);
  } else {
    bookmarks.value = [{ name: "Add bookmarks", text: "https://example.com", icon: "🌐" }];
    saveBookmarks();
  }
}

provide('bookmarks', {
  bookmarks,
  setBookmark,
  changeBookmark,
  deleteBookmark
});

provide('loaders', {
  loadUrlBox,
  loadReadingLists,
  loadBookmarks
})

const histories = ref([]);

function addHistory(text) {
  histories.value.splice(0, 0, text);
  saveHistories();
}

function deleteHistory(text) {
  histories.value = histories.value.filter((history) => history != text);
  saveHistories();
}

function saveHistories() {
  localStorage.setItem("history", JSON.stringify(histories.value));
}

function loadHistories() {
  const storage = localStorage.getItem("history");
  if(storage) {
    histories.value = JSON.parse(storage)
  } else {
    histories.value = []
  }
}

provide('histories', {
  histories,
  addHistory,
  deleteHistory
});

loadBookmarks()
loadUrlBox()
loadReadingLists()
loadHistories()
</script>

<template>
  <RouterView />
  <Tabs></Tabs>
</template>