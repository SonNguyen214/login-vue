<template>
  <div class="custom-cursor" ref="cursor"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const cursor = ref(null)

const moveCursor = (e) => {
  gsap.to(cursor.value, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.2,
    ease: 'power2.out',
  })
}

const hoverEffect = (e) => {
  const { left, top, width, height } = e.target.getBoundingClientRect()
  const centerX = left + width / 2
  const centerY = top + height / 2
  gsap.to(cursor.value, {
    x: centerX,
    y: centerY,
    scale: 2,
    duration: 0.3,
  })
}

const leaveEffect = () => {
  gsap.to(cursor.value, { scale: 1, duration: 0.3 })
}

onMounted(() => {
  document.addEventListener('mousemove', moveCursor)
  document.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('mouseenter', hoverEffect)
    btn.addEventListener('mouseleave', leaveEffect)
  })
})

onUnmounted(() => {
  document.removeEventListener('mousemove', moveCursor)
})
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  width: 20px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  z-index: 9999;
}
</style>
