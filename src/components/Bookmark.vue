<script setup>
  import { ref, computed } from 'vue'
  const props = defineProps({
    name: String,
    url: String, 
    icon: String
  })

  const computedUrl = computed(() => {
    if(props.url.includes("http")) {
      return props.url
    } else {
      return "//" + props.url
    }
  });

  const emit = defineEmits(["delete", "update"])
</script>

<style scoped>
  .bookmarkIcon {
    border: none;
    border-radius: 20%;
    background-color: var(--secBgColor);
    transition: all 0.5s;
    aspect-ratio: 1 / 1;
    margin: 0;
  }
  text {
    fill: var(--bodyColor);
    margin: 0;
    padding: 0;
    font-weight: bold;
    font-family:
      Inter,
      -apple-system,
      'BlinkMacSystemFont',
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      Sans-Serif;
  }
  .bookmarkNameBar {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, auto);
  }
  .bookmarkName {
    overflow-wrap: break-word;
    text-align: center;
  }
  .editButton span {
    font-size: 1em;
    margin: 0 -0.4em;
  }
</style>

<template>
  <div>
    <a :href="computedUrl">
      <svg viewBox="0 0 100 100" class="bookmarkIcon">
        <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="60" id="iconText">
          {{ icon }}
        </text>
      </svg>
    </a>
    <div class="bookmarkNameBar">
      <div class="bookmarkName">{{ name }}</div>
      <button @click="$emit('update')" class="editButton">
        <span class="material-symbols-outlined">more_vert</span>
      </button>
    </div>
  </div>
</template>