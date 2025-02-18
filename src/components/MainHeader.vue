<script setup>
defineProps({
  showHeader: Boolean,
})

import { Button } from 'primevue'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { localStorageKey, pages } from '@/constants'
import { useToast } from 'primevue/usetoast'
import { handleLogout } from '@/utils/auth'

const toast = useToast()
const router = useRouter()
const isLoading = ref(false)
const accessToken = ref('')

//check user login status when come in home
onMounted(() => {
  const token = localStorage.getItem(localStorageKey.accessToken)
  accessToken.value = token || ''
})

const onLogout = async () => {
  //if user is not logged in --> redirect to login page
  if (accessToken.value.length <= 0) {
    router.push(pages.login)
    return
  }
  isLoading.value = true
  await handleLogout({ toast: toast })
  accessToken.value = ''
  isLoading.value = false
}
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
          @click="onLogout"
          :label="accessToken.length > 0 ? 'Logout' : 'Get started'"
        />
        <div class="avatar">Avatar</div>
      </div>
    </div>
  </div>
</template>

<style></style>
