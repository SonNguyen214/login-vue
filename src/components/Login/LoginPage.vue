<script setup>
import { onMounted, ref } from 'vue'
import BoxImage from './BoxImage.vue'
import LoginForm from './LoginForm.vue'
import { useRouter } from 'vue-router'
import { pages } from '@/constants'

const showFormSignUp = ref(false)
const router = useRouter()

onMounted(() => {
  const token = localStorage.getItem('accessToken')
  if (token && token.length > 0) {
    router.push(pages.home)
  }
})

const handleChangeForm = () => {
  showFormSignUp.value = !showFormSignUp.value
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <BoxImage :showFormSignUp="showFormSignUp" @handleChangeForm="handleChangeForm" />
      <LoginForm :showFormSignUp="showFormSignUp" @handleChangeForm="handleChangeForm" />
    </div>
  </div>
</template>

<style></style>
