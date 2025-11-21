<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.base {
    display: flex;
    height: 3em;
    justify-content: space-evenly;
    align-items: center;
    position: absolute;
    width: 100vw;
    bottom: 0;
}

.tabButton {
    display: block;
    color: rgba(var(--bodyColorValue), 0.2);

    &.router-link-active {
        color: var(--bodyColor);
        border-radius: 5em;
    }
}
</style>

<template>
    <div class="base">
        <RouterLink to="/" class="tabButton">
            <span class="material-symbols-outlined">
                home
            </span>
        </RouterLink>
        <RouterLink to="/readingLists" class="tabButton">
            <span class="material-symbols-outlined">
                bookmarks
            </span>
        </RouterLink>
        <RouterLink to="/history" class="tabButton">
            <span class="material-symbols-outlined">
                history
            </span>
        </RouterLink>
        <RouterLink to="/settings" class="tabButton">
            <span class="material-symbols-outlined">
                settings
            </span>
        </RouterLink>
    </div>
</template>