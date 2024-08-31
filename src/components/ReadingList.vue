<script setup>
  import { ref, computed } from 'vue'
  const props = defineProps({
    url: String
  });
  const emit = defineEmits(["delete"]);

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
</script>

<style>
  .readingList {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  .readingList a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .deleteIcon {
      font-size: 1em;
  }
</style>

<template>
  <div class="readingList">
    <a :href="computedUrl" @click="$emit('moveUp')">{{ url }}</a>
    <button @click="$emit('delete')"><span class="material-symbols-outlined deleteIcon">
        delete
    </span></button>
  </div>
</template>
