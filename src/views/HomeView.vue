<script setup>
import { pages } from '@/contants'
// import axios from 'axios'
import { Button } from 'primevue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = async () => {
  try {
    // await axios.post(apiUrl.logout)
    localStorage.setItem('accessToken', '')
    router.push(pages.login)

    // if (res.data.status === 200) {
    // }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <main>
    <div class="header">
      <div class="wrapper">
        <div class="logo"></div>
        <div class="nav"></div>
        <Button @click="handleLogout" label="Logout" />
      </div>
    </div>
  </main>
</template>

<style lang="scss">

</style>
