<script setup>
import { inject, computed } from 'vue';

const { urlBox, changeUrlBox } = inject("urlBox");

const { histories, addHistory, deleteHistory } = inject("histories");

function submitUrlBox(e) {
    if (e.keyCode == 13) {
        if (isReadingListUnpushable.value) {
            moveReadingListTop(urlBox.value);
        }
        addHistory(urlBox.value);
        const domainPart = computedUrl.value.split("/")[2];
        if (domainPart.substr(-4).includes(".") && domainPart.substr(-1) != "." && !urlBox.value.includes(" ")) {
        window.location.assign(computedUrl.value);
        } else {
        window.location.assign(search.value);
        }
    }
}

const computedUrl = computed(() => {
  if(urlBox.value.includes("http")) {
    return urlBox.value
  } else {
    return "//" + urlBox.value
  }
});

const isUrlBoxDeletable = computed(() => {
  return urlBox.value != "";
})

const search = computed(() => {
  return "https://www.google.com/search?q=" + urlBox.value
});

const { readingLists, addReadingList, deleteReadingList, moveReadingListTop } = inject("readingLists");

const isReadingListUnpushable = computed(() => {
  let result = urlBox.value == ""
  result = result || readingLists.value.includes(urlBox.value);
  return result;
})

const { bookmarks, addBookmark, deleteBookmark } = inject("bookmarks");

const isBookmarkUnpushable = computed(() => {
  let result = urlBox.value == ""
  result = result || bookmarks.value.some((bookmark) => bookmark.text == urlBox.value);
  return result;
})
</script>

<style scoped>
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
  .urlBar {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, auto) minmax(0, auto) minmax(0, auto) minmax(0, auto) minmax(0, auto);
    align-items: center;
    margin: 0 auto 3vh auto;
    width: 100%;
    max-width: 40em;
    padding: 0.5em 0.8em;
    border: none;
    border-radius: 100000px;
    font-size: 1.2em;
    background-color: var(--secBgColor);
    box-sizing: border-box;
  }
  input {
    outline: none;
    border: none;
    background: none;
    padding: 0.1em 0.2em;
    margin: 0;
    border-radius: 0;
    color: var(--bodyColor);
  }
  .deleteButton {
    font-size: 1.0em;
    font-variation-settings:
      'FILL' 1;
    margin: 0 0.1em
  }
</style>

<template>
    <div class="urlBar">
        <input type="text" :value="urlBox" placeholder="Type URL" @input="(e) => changeUrlBox(e.target.value)" @keydown="submitUrlBox" />

        <button @click="changeUrlBox('')" v-if="isUrlBoxDeletable">
            <span class="material-symbols-outlined deleteButton">
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

        <button @click="addReadingList(urlBox)" :disabled="isReadingListUnpushable">
            <span class="material-symbols-outlined">
                bookmark_add
            </span>
        </button>

        <button @click="setBookmark(urlBox, urlBox, '🌐')" :disabled="isBookmarkUnpushable">
            <span class="material-symbols-outlined">
                star
            </span>
        </button>
    </div>
</template>