<script setup>
    import { ref } from 'vue'
    import { RouterLink } from 'vue-router';

    const urlBox = ref("")
    const readingLists = ref("")
    const bookmarks = ref("")

    function loadUrlBox() {
        const storage = localStorage.getItem("urlBox")
        if(storage) {
            urlBox.value = storage
        }
    }
    function loadReadingLists() {
        const storage = localStorage.getItem("readingLists")
        if(storage) {
            readingLists.value = storage
        }
    }
    function loadBookmarks() {
        const storage = localStorage.getItem("bookmarks")
        if(storage) {
            bookmarks.value = storage
        }
    }

    function updateUrlBox() {
        localStorage.setItem("urlBox", urlBox.value)
    }
    function updateReadingLists() {
        localStorage.setItem("readingLists", readingLists.value)
    }
    function updateBookmarks() {
        localStorage.setItem("bookmarks", bookmarks.value)
    }

    loadUrlBox()
    loadReadingLists()
    loadBookmarks()
</script>

<style scoped>
    .contents {
        padding: 0 1em;
    }
    .typeBox {
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap: 1em;
        row-gap: 1em;
    }
</style>

<template>
    <div class="main">
        <div class="contents">
            <h1>LocalStorage</h1>
            <div class="typeBox">
                <label>urlBox</label>
                <input type="text" v-model="urlBox" @input="updateUrlBox">
                <label>readingLists</label>
                <input type="text" v-model="readingLists" @input="updateReadingLists">
                <label>bookmarks</label>
                <input type="text" v-model="bookmarks" @input="updateBookmarks">
            </div>
        </div>
    </div>
</template>