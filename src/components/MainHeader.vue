<script setup>
defineProps({
  showHeader: Boolean,
})

// import axios from 'axios'
import { Button } from 'primevue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { pages } from '@/contants'
import { useToast } from 'primevue/usetoast'
import { useCheckAuth } from '@/store/authen'

const toast = useToast()
const router = useRouter()
const auth = useCheckAuth()

const handleLogout = async () => {
  if (!auth.authenticate) {
    router.push(pages.login)
    return
  }
  try {
    localStorage.setItem('accessToken', '')
    auth.logout()
    toast.add({
      severity: 'info',
      summary: 'Logout success!',
      life: 3000,
    })
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  const token = localStorage.getItem('accessToken')
  if (token && token.length > 0) {
    auth.login()
  } else {
    auth.logout()
  }
})
</script>

<template>
  <div v-if="showHeader" class="header">
    <div class="wrapper">
      <div class="logo">Logo</div>
      <nav class="nav">
        <div class="item">Home</div>
        <div class="item">Featue</div>
        <div class="item">Author</div>
        <div class="item">Blogs</div>
        <div class="item">Help</div>
      </nav>
      <div class="account">
        <Button @click="handleLogout" :label="auth.authenticate ? 'Logout' : 'Login'" />
        <div class="avatar">Avatar</div>
      </div>
    </div>
  </div>
</template>

<style></style>
