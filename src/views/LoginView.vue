<script setup>
import { ref } from 'vue'
import BoxImage from '@/components/Login/BoxImage.vue'
import LoginForm from '@/components/Login/LoginForm.vue'

const showFormSignUp = ref(false)

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
