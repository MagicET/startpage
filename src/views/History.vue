<script setup>
import { inject, ref, computed } from 'vue';
import UrlBar from '../components/UrlBar.vue';

const { urlBox, changeUrlBox } = inject("urlBox");

const { histories, addHistory, deleteHistory } = inject("histories");

const computedUrl = (text) => {
    if(text == null) {
        return "";
    }
    let validUrl = text;
    if(!text.includes("http")) {
        validUrl =  "//" + text;
    }
    const domainPart = validUrl.split("/")[2];
    if (domainPart.substr(-4).includes(".") && domainPart.substr(-1) != "." && !text.includes(" ")) {
        return validUrl;
    } else {
        return "https://www.google.com/search?q=" + text;
    }
    
  };
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

    .histories {
        overflow-y: scroll;
    }

    .history {
        display: grid;
        grid-template-columns: 1fr auto;

        &:has(+ .history) {
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
    <div class="histories">
        <div v-for="history in histories" class="history">
            <a :href="computedUrl(history)">{{history}}</a>
            <button @click="deleteHistory(history)"><span class="material-symbols-outlined">
                close
            </span></button>
        </div>
    </div>
</div>
</template>