<template>
  <div class="box-image" ref="boxImageRef">
    <div class="h-full flex items-center">
      <div class="max-w-[350px] img-login">
        <Carousel
          :value="products"
          :numVisible="1"
          :numScroll="1"
          circular
          :autoplayInterval="3000"
        >
          <template #item="slotProps">
            <div>
              <div>
                <div class="relative mx-auto">
                  <img
                    :src="slotProps.data.url"
                    :alt="slotProps.data.name"
                    class="w-full rounded"
                  />
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </div>
    </div>
    <div class="text-register" ref="textRef">
      {{ showFormSignUp ? 'Already have an account?' : "Don't have an account?" }}
      <span @click="() => emit('handleChangeForm')">{{
        showFormSignUp ? 'Login now' : 'Request Now'
      }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  showFormSignUp: Boolean,
})
const emit = defineEmits(['handleChangeForm'])
import { ref, onMounted } from 'vue'
import Carousel from 'primevue/carousel'
import gsap from 'gsap'
const textRef = ref('')

onMounted(() => {
  gsap.fromTo(
    textRef.value,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.5,
      delay: 2,
      ease: 'power1.inOut',
    },
  )
})

const products = ref([
  {
    url: '/bg-login.png',
  },
  {
    url: '/bg-login1.webp',
  },
  {
    url: '/bg-login2.png',
  },
])
</script>
