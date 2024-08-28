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
    .deleteIcon {
        font-size: 1em;
    }
</style>

<template>
  <div>
    <a :href="computedUrl">{{ url }}</a>
    <button @click="$emit('delete')"><span class="material-symbols-outlined deleteIcon">
        delete
    </span></button>
  </div>
</template>
