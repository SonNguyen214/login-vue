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
    <div @click="() => router.push(pages.home)" class="back-to-home" ref="backRef">
      <i class="pi pi-arrow-left"></i> <span>Go back</span>
    </div>
    <!-- <div class="text-register" ref="textRef">
      {{ showFormSignUp ? 'Already have an account?' : "Don't have an account?" }}
      <span @click="() => emit('handleChangeForm')">{{
        showFormSignUp ? 'Login now' : 'Request Now'
      }}</span>
    </div> -->
  </div>
</template>

<script setup>
defineProps({
  showFormSignUp: Boolean,
})
import { ref, onMounted } from 'vue'
import Carousel from 'primevue/carousel'
import gsap from 'gsap'
import { useRouter } from 'vue-router'
import { pages } from '@/constants'

const router = useRouter()
const backRef = ref()

onMounted(() => {
  gsap.fromTo(
    backRef.value,
    { opacity: 0 },
    {
      opacity: 1,
      delay: 1.5,
      duration: 0.2,
      ease: 'power1.out',
    },
  )
})

const products = ref([
  {
    url: '/img/login/slide1.png',
  },
  {
    url: '/img/login/slide2.webp',
  },
  {
    url: '/img/login/slide3.png',
  },
])
</script>
