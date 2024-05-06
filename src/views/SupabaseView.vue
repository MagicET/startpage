<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { supabase } from '../lib/supabaseClient'

  const bookmarks = ref([])
  const input = ref("")

  async function getBookmarks() {
    const { data, error } = await supabase.from('bookmarks').select()
    bookmarks.value = data
  }

  async function sendBookmark() {
    await supabase
      .from('bookmarks')
      .insert({ url: input.value, icon: "🌐" })
  }

  function subscribeBookmark() {
    //マウントされたら初回に取得する
    getBookmarks()
    const { data, error } = supabase
      .channel('supabase_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookmarks' }, payload => {
        console.log('Change received!', payload)
        /*if (payload.eventType = "INSERT") {
          bookmarks.value.push(payload.new)
        } else if (payload.eventType = "DELETE") {
          bookmarks.value.splice(bookmarks.value.findIndex((bookmark) => bookmark.id = payload.old.id), 1)
        }*/
        getBookmarks()
      })
      .subscribe()
  }

  async function unsubscribeBookmark() {
    const { error } = await supabase.removeAllChannels()
    console.log("Unsubscribed", error)
  }

  onMounted(() => {
    console.log("Mounted")
    //getBookmarks()
    subscribeBookmark()
  })
  onBeforeUnmount(() => {
    unsubscribeBookmark()
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