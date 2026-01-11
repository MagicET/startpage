<script setup>
  import { ref, computed } from 'vue'
  const props = defineProps({
    url: String,
    opened: String
  });

  const computedUrl = computed(() => {
    if(props.url == null) {
        return "";
    }
    if(props.url.includes("http")) {
        return props.url;
    } else {
        return "//" + props.url;
    }
  });

  const displayUrl = computed(() => {
    if (props.opened == props.url) {
      return props.url;
    }
    return decodeURI(props.url.split("//").pop());
  })

  const openedCoundition = computed(() => {
    if(props.opened == props.url) {
      return "opened"
    }
    return ""
  })

  const openIcon = computed(() => {
    if(props.opened == props.url) {
      return "keyboard_arrow_down"
    }
    return "chevron_right"
  })
</script>

<style scoped>
  .readingList {
    display: grid;
    grid-template-columns: auto 1fr auto;

    a {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &.opened a {
      white-space: normal;
      word-break: break-all;
      overflow: hidden;
    }

    button span {
      font-size: 1em;
    }
  }
</style>

<template>
  <div class="readingList" :class="openedCoundition">
    <button @click="$emit('open')"><span class="material-symbols-outlined">
      {{ openIcon }}
    </span></button>
    <a :href="computedUrl" @click="$emit('moveUp')">{{ displayUrl }}</a>
    <button v-if="props.opened == props.url" @click="$emit('delete')"><span class="material-symbols-outlined">
        delete
    </span></button>
  </div>
</template>
