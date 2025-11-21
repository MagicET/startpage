<script setup>
import { inject, ref, computed } from 'vue';
import UrlBar from '../components/UrlBar.vue';

const { urlBox, changeUrlBox } = inject("urlBox");

const { readingLists, addReadingList, deleteReadingList, moveReadingListTop } = inject("readingLists");

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

    .readingLists {
        overflow-y: scroll;
    }

    .readingList {
        display: grid;
        grid-template-columns: 1fr auto;

        &:has(+ .readingList) {
            padding-bottom: 0.3em;
            border-bottom: 1px solid rgba(var(--bodyColorValue), 0.2);
            margin-bottom: 0.3em;
        }

        a {
            white-space: normal;
            word-break: break-all;
            overflow: hidden;
        }

        .material-symbols-outlined {
            font-size: 1em;
        }
    }
</style>

<template>
<div class="main">
    <UrlBar></UrlBar>
    <div class="readingLists">
        <div v-for="readingList in readingLists" :key="readingList" class="readingList">
            <a :href="readingList" @click="moveReadingListTop(readingList)">{{readingList}}</a>
            <button @click="deleteReadingList(readingList)"><span class="material-symbols-outlined">
                delete
            </span></button>
        </div>
    </div>
</div>
</template>