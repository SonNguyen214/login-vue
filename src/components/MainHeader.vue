<script setup>
defineProps({
  showHeader: Boolean,
})

import { Button } from 'primevue'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { pages } from '@/constants'
import { useToast } from 'primevue/usetoast'
import { useCheckAuth } from '@/store/authen'
import { requestLogout } from '@/services'

const toast = useToast()
const router = useRouter()
const auth = useCheckAuth()
const isLoading = ref(false)

const handleLogout = async () => {
  //if user is not logged in --> redirect to login page
  if (!auth.authenticate) {
    router.push(pages.login)
    return
  }
  isLoading.value = true
  const token = localStorage.getItem('accessToken') || ''
  try {
    const response = await requestLogout(token)
    if (response.status === 200) {
      localStorage.setItem('accessToken', '')
      auth.logout()
      toast.add({
        severity: 'info',
        summary: response.data.message || 'You logged out!',
        life: 3000,
      })
    }
  } catch (error) {
    if (error?.response) {
      toast.add({
        severity: 'error',
        summary: 'Logout Failed!',
        detail: error?.response?.data?.message || 'Something went wrong!! Please try again',
        life: 3000,
      })
    }
  } finally {
    isLoading.value = false
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
        <Button
          :loading="isLoading"
          @click="handleLogout"
          :label="auth.authenticate ? 'Logout' : 'Get started'"
        />
        <div class="avatar">Avatar</div>
      </div>
    </div>
  </div>
</template>

<style></style>
