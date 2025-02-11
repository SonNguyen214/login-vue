<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { pages } from './contants'
import Toast from 'primevue/toast';
import Header from './components/Header.vue';
const router = useRouter()
const accessToken = ref('')
const path = ref('')

onMounted(() => {
  accessToken.value = localStorage.getItem('accessToken')
  if (accessToken.value && accessToken.value.length > 0) {
    router.push(pages.home)
  } else {
    router.push(pages.login)
  }

})
  const pathname = computed(() => router.currentRoute.value.path)

watch(pathname, (value) => {
  path.value = value
})

</script>

<template>
  <Header :show-header="!path.includes(pages.login)"/>
  <RouterView />
  <Toast />
</template>

<style></style>
