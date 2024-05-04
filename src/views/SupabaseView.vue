<script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '../lib/supabaseClient'

  const bookmarks = ref([])
  const input = ref("")

  async function getBookmarks() {
    const { data, error } = await supabase.from('bookmarks').select()
    bookmarks.value = data
    console.log(bookmarks.value)
  }

  async function sendBookmark() {

    const { error } = await supabase
      .from('bookmarks')
      .insert({ url: input.value, icon: "🌐" })
  }

  onMounted(() => {
    console.log("Mounted")
    getBookmarks()
  })
</script>


<template>
  <div class="about">
    <p>Supabaseを使っての感想</p>
    <input type="text" v-model="input">
    <button @click="sendBookmark">追加</button>
    <div>
      <ul>
        <li v-for="bookmark in bookmarks" :key="bookmark.id">{{ bookmark.icon }}{{ bookmark.url }}</li>
      </ul>
    </div>
  </div>
</template>
  
<style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
</style>