<script setup>
defineProps({
  showHeader: Boolean,
})
</script>

<template>
  <main>
    <div v-if="showHeader" class="header">
      <div class="wrapper">
        <div class="logo">Logo</div>
        <div class="nav">
          <div class="item">Home</div>
          <div class="item">Featue</div>
          <div class="item">Author</div>
          <div class="item">Blogs</div>
          <div class="item">Help</div>
        </div>
        <Button @click="handleLogout" label="Logout" />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.header {
  @apply w-100dvw h-[80px];
  .wrapper{
    @apply  flex justify-between px-10 border-none border-b-[1px];
    .logo{

    }
    .nav{
      .item {

      }
    }
  }
}
</style>
