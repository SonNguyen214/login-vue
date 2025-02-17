<script setup>
import { computed, ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { pages } from './constants'
import Toast from 'primevue/toast'
import Header from './components/MainHeader.vue'
// import CustomCursor from './components/Custom/CustomCursor.vue'
const router = useRouter()
const path = ref('')

const pathname = computed(() => router.currentRoute.value.path)

watch(pathname, (value) => {
  path.value = value
})
</script>

<template>
  <!-- <CustomCursor /> -->
  <Header :show-header="!path.includes(pages.login)" />
  <RouterView />
  <Toast position="top-right" />
</template>

<style></style>
