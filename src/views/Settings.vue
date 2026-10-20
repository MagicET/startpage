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

    async function copyReadingLists() {
        await navigator.clipboard.writeText(readingLists.value);
    }

    async function pasteReadingLists() {
        if(confirm("Do you want to overwrite the reading lists?")) {
            navigator.clipboard
            .readText()
            .then((clipText) => {
                console.log(clipText);
                readingLists.value = clipText;
                updateReadingLists();
            })
            .catch(() => {
                console.error("Error copying clipboard")
            });
        }
    }

    async function copyBookmarks() {
        await navigator.clipboard.writeText(bookmarks.value);
    }

    async function pasteBookmarks() {
        if(confirm("Do you want to overwrite the bookmarks?")) {
            navigator.clipboard
            .readText()
            .then((clipText) => {
                console.log(clipText);
                bookmarks.value = clipText;
                updateBookmarks();
            })
            .catch(() => {
                console.error("Error copying clipboard")
            });;
        }
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
    .copyButtons {
        button.clicked {
            font-variation-settings:
                'FILL' 1,
                'wght' 400,
                'GRAD' 0,
                'opsz' 24;
        }
        
        button span {
            padding: 0;
            margin-right: 0.2em;
            vertical-align: baseline;
            font-size: 1.4em;
        }
    }
</style>

<template>
    <div class="main">
        <div class="contents">
            <h1>LocalStorage</h1>
            <div class="typeBox">
                <label>urlBox</label>
                <input type="text" v-model="urlBox" @input="updateUrlBox">
                <label>
                    readingLists
                    <div class="copyButtons">
                        <button @click="copyReadingLists"><span class="material-symbols-outlined">content_copy</span></button>
                        <button @click="pasteReadingLists"><span class="material-symbols-outlined">content_paste</span></button>
                    </div>
                </label>
                <textarea rows="4" v-model="readingLists" @input="updateReadingLists"></textarea>
                <label>
                    bookmarks
                    <div class="copyButtons">
                        <button @click="copyBookmarks"><span class="material-symbols-outlined">content_copy</span></button>
                        <button @click="pasteBookmarks"><span class="material-symbols-outlined">content_paste</span></button>
                    </div>
                </label>
                <textarea rows="4" v-model="bookmarks" @input="updateBookmarks"></textarea>
            </div>
        </div>
    </div>
</template>