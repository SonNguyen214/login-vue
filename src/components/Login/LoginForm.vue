<template>
  <div class="box-form" ref="boxFormRef">
    <h1 class="title" ref="titleRef">
      {{ formTitle }}
    </h1>
    <div class="des" ref="desRef">Please enter your details</div>
    <Form :resolver @submit="onFormSubmit" ref="formRef">
      <div class="form-inputs">
        <div ref="nameRef">
          <FormField v-slot="$field" name="username" initialValue="">
            <FloatLabel>
              <InputText
                type="text"
                :disabled="isLoading"
                :class="[{ error: $field?.invalid }]"
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
        <div ref="passwordRef">
          <FormField v-slot="$field" name="password" initialValue="">
            <FloatLabel>
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
      <div ref="btnRef" class="w-full">
        <Button
          :loading="isLoading"
          type="submit"
          :label="showFormSignUp ? 'Sign Up' : 'Login'"
          class="btn-submit"
        />
      </div>
    </Form>
    <div class="socials-login">
      <div class="line" ref="lineRef">
        <hr />
        <span> Or continue with </span>
      </div>
      <div class="socials">
        <div v-for="social in socialsArr" :key="social.class" ref="socialsRef">
          <Image :src="social.imageUrl" alt="img" :class="social.class" />
        </div>
      </div>
    </div>
    <div class="text-register">
      {{ showFormSignUp ? 'Already have an account?' : "Don't have an account?" }}
      <span @click="() => emit('handleChangeForm')">{{ btnText }}</span>
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
import { useRouter } from 'vue-router'
import { pages } from '@/constants'
import { computed, onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useCheckAuth } from '@/store/authen'
import gsap from 'gsap'
import Password from 'primevue/password'
import { requestLogin } from '@/services'

const toast = useToast()
const auth = useCheckAuth()
const router = useRouter()
const isLoading = ref(false)
const boxFormRef = ref()
const socialsRef = ref([])
const lineRef = ref()
const titleRef = ref()
const desRef = ref()
const nameRef = ref()
const passwordRef = ref()
const btnRef = ref()
const formRef = ref()
const formTitle = computed(() => (props.showFormSignUp ? 'Create new account' : 'Welcome Back!'))
const btnText = computed(() => (props.showFormSignUp ? 'Login now' : 'Request Now'))

const socialsArr = [
  { imageUrl: './fb-icon.png', class: 'facebook' },
  { imageUrl: './gg-icon.png', class: 'google' },
  { imageUrl: './apple-icon.png', class: 'apple' },
]

const resetForm = () => {
  formRef.value?.reset()
}

const resolver = zodResolver(
  z.object({
    username: z.string().min(1, { message: 'Your Name is required.' }),
    password: z.string().min(1, { message: 'Your Password is required.' }),
  }),
)

onMounted(() => {
  const tl = gsap.timeline()
  const textElement = titleRef.value
  const splitText = textElement.innerText.split('') // Tách từng chữ cái thành mảng
  textElement.innerHTML = splitText.map((char) => `<span class="letter">${char}</span>`).join('')

  tl.fromTo(
    boxFormRef.value,
    { opacity: 0, x: -200 },
    { opacity: 1, x: 0, duration: 1.2, ease: 'power1.out' },
  )
    .fromTo(
      textElement.querySelectorAll('.letter'),
      { opacity: 0, x: -10, y: -10 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power1.out',
      },
    )
    .fromTo(
      desRef.value,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.3,
        ease: 'power1.out',
      },
    )
    .fromTo(
      nameRef.value,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power1.out',
      },
    )
    .fromTo(
      passwordRef.value,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power1.out',
      },
    )
    .fromTo(
      btnRef.value,
      { scale: 0 },
      {
        scale: 1,
        duration: 0.3,
        ease: 'power1.out',
      },
    )
    .fromTo(
      lineRef.value,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.2,
        ease: 'power1.out',
      },
    )
    .fromTo(
      socialsRef.value[0],
      { scale: 0 },
      {
        scale: 1,
        duration: 0.2,
        ease: 'power1.out',
      },
    )
    .fromTo(
      socialsRef.value[1],
      { scale: 0 },
      {
        scale: 1,
        duration: 0.2,
        ease: 'power1.out',
      },
    )
    .fromTo(
      socialsRef.value[2],
      { scale: 0 },
      {
        scale: 1,
        duration: 0.2,
        ease: 'power1.out',
      },
    )
})

const onFormSubmit = async ({ values }) => {
  isLoading.value = true
  try {
    if (props.showFormSignUp) {
      toast.add({
        severity: 'success',
        summary: 'Congratulation!',
        detail: 'Create new account success!',
        life: 3000,
      })
      emit('handleChangeForm')
      resetForm()
      return
    }

    const res = await requestLogin({ user_id: values.username, password: values.password })

    if (res.status === 200) {
      localStorage.setItem('accessToken', res.data.token)
      toast.add({
        severity: 'success',
        summary: 'Congratulation!',
        detail: 'Login success!',
        life: 3000,
      })
      auth.login()
      router.push(pages.home)
    }
  } catch (error) {
    if (error?.response) {
      toast.add({
        severity: 'error',
        summary: 'Login Failed!',
        detail: error?.response?.data?.message || 'Something went wrong!! Plase try again',
        life: 3000,
      })
    }
  } finally {
    isLoading.value = false
  }
}
</script>
