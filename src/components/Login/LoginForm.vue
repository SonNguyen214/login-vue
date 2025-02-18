<template>
  <div class="box-form">
    <h1 class="title" ref="titleRef">
      {{ formTitle }}
    </h1>
    <div class="des">Please enter your details</div>
    <Form :resolver @submit="onFormSubmit" ref="formRef">
      <div class="form-inputs">
        <div class="input-name">
          <FormField v-slot="$field" name="username" initialValue="">
            <FloatLabel variant="on">
              <InputText
                type="text"
                :disabled="isLoading"
                :class="[{ error: $field?.invalid }]"
                @input="$field.onInput"
                @blur="$field.onBlur"
                v-bind="$field.props"
                id="username"
              />
              <label for="username">Your Name</label>
            </FloatLabel>
            <span
              style="font-size: 10px; color: red; text-align: start"
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $field.error?.message }}</span
            >
          </FormField>
        </div>
        <div class="input-password">
          <FormField v-slot="$field" name="password" initialValue="">
            <FloatLabel variant="on">
              <Password
                toggleMask
                unmaskIcon
                v-model="$field.value"
                type="password"
                :disabled="isLoading"
                :class="[{ error: $field?.invalid }]"
                @input="$field.onInput"
                @blur="$field.onBlur"
                @change="$field.onChange"
                id="password"
              />
              <label for="password">Your Password</label>
            </FloatLabel>
            <span
              style="font-size: 10px; color: red; text-align: start"
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $field.error?.message }}</span
            >
          </FormField>
          <div class="forgot-password">
            <div></div>
            <div class="text h-[16px]">{{ showFormSignUp ? '' : 'Forgot password?' }}</div>
          </div>
        </div>
      </div>
      <div class="w-full btn-form">
        <Button
          :loading="isLoading"
          type="submit"
          :label="showFormSignUp ? 'Sign Up' : 'Login'"
          class="btn-submit"
        />
      </div>
    </Form>
    <div class="socials-login">
      <div class="line">
        <hr />
        <span> Or continue with </span>
      </div>
      <div class="socials">
        <div v-for="social in socialsArr" :key="social.class" class="item">
          <Image :src="social.imageUrl" alt="img" :class="social.class" />
        </div>
      </div>
    </div>
    <div class="text-register">
      {{ showFormSignUp ? 'Already have an account?' : "Don't have an account?" }}
      <span @click="() => emit('handleChangeForm')">{{ signUpText }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  showFormSignUp: Boolean,
})
const emit = defineEmits(['handleChangeForm'])
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { Form, FormField } from '@primevue/forms'
import { Button, InputText, Image, FloatLabel } from 'primevue'
import { computed, nextTick, ref, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import gsap from 'gsap'
import Password from 'primevue/password'
import { notification } from '@/utils'
import { handleLogin } from '@/utils/auth'

const toast = useToast()
const isLoading = ref(false)
const formRef = ref()
const titleRef = ref()
const formTitle = computed(() => (props.showFormSignUp ? 'Create new account' : 'Welcome Back!'))
const signUpText = computed(() => (props.showFormSignUp ? 'Login now' : 'Request Now'))

const socialsArr = [
  { imageUrl: './img/login/fb-icon.png', class: 'facebook' },
  { imageUrl: './img/login/gg-icon.png', class: 'google' },
  { imageUrl: './img/login/apple-icon.png', class: 'apple' },
]

const resolver = zodResolver(
  z.object({
    username: z.string().min(1, { message: 'Your Name is required.' }),
    password: z.string().min(1, { message: 'Your Password is required.' }),
  }),
)

const formAnimate = () => {
  const tl = gsap.timeline()
  const textElement = titleRef.value
  const splitText = textElement.innerText.split('') // split each text to an array
  textElement.innerHTML = splitText.map((char) => `<span class="letter">${char}</span>`).join('')
  tl.fromTo(
    '.box-form',
    { opacity: 0, x: -200 },
    { opacity: 1, x: 0, duration: 0.7, ease: 'power1.out' },
  )
    .fromTo(
      '.title > .letter',
      { opacity: 0, x: -10, y: -10 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power1.out',
      },
    )
    .fromTo(
      '.des',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.2,
        ease: 'power1.out',
      },
    )
    .fromTo(
      '.input-name',
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power1.out',
      },
    )
    .fromTo(
      '.input-password',
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power1.out',
      },
    )
    .fromTo(
      '.btn-form',
      { scale: 0 },
      {
        scale: 1,
        duration: 0.3,
        ease: 'power1.out',
      },
    )
    .fromTo(
      '.line',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.2,
        ease: 'power1.out',
      },
    )
    .fromTo(
      '.socials > .item',
      { scale: 0 },
      {
        scale: 1,
        duration: 0.2,
        ease: 'power1.out',
      },
    )
    .fromTo(
      '.text-register',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.2,
        ease: 'power1.out',
      },
    )
}

nextTick(() => {
  formAnimate()
})

watch(
  () => props.showFormSignUp,
  () => {
    formAnimate()
    formRef.value?.reset()
  },
)

const onFormSubmit = async ({ values }) => {
  isLoading.value = true
  //Fake sign up (Don't have api from BE)
  if (props.showFormSignUp) {
    notification(toast, 'success', 'Congratulation', 'Signup success')
    emit('handleChangeForm')
    formRef.value?.reset()
    isLoading.value = false
    return
  }
  await handleLogin({ toast: toast, username: values.username, password: values.password })
  isLoading.value = false
}
</script>
