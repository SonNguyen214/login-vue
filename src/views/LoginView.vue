<script setup>
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { Form, FormField } from '@primevue/forms'
import { Button, InputText, Image, FloatLabel } from 'primevue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { apiUrl, pages } from '@/contants'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useCheckAuth } from '@/store/authen'

const toast = useToast()
const auth = useCheckAuth()

const router = useRouter()
const isLoading = ref(false)
const showFormSignUp = ref(false)

const resolver = zodResolver(
  z.object({
    username: z.string().min(1, { message: 'Your Name is required.' }),
    password: z.string().min(1, { message: 'Your Password is required.' }),
  }),
)

const onFormSubmit = async ({ values }) => {
  isLoading.value = true

  try {
    const res = await axios.post(showFormSignUp.value ? apiUrl.signUp : apiUrl.login, {
      user_id: values.username,
      password: values.password,
      ...(values.confirmPassword && showFormSignUp.value && { confirm: values.confirmPassword }),
    })
    if (showFormSignUp.value) {
      toast.add({
        severity: 'success',
        summary: 'Congratulation!',
        detail: 'Create new account success!',
        life: 3000,
      })
      showFormSignUp.value = false
      return
    }
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

const handleChangeForm = () => {
  if (isLoading.value) return
  showFormSignUp.value = !showFormSignUp.value
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="box-image">
        <Image src="/bg-login.png" alt="img-login" />
        <div class="text-register">
          {{ showFormSignUp ? 'Already have an account?' : "Don't have an account?" }}
          <span @click="handleChangeForm">{{ showFormSignUp ? 'Login now' : 'Request Now' }}</span>
        </div>
      </div>
      <div class="box-form">
        <h1 class="title">
          {{ showFormSignUp ? 'Create new account' : 'Welcome Back!' }}
        </h1>
        <div class="des">Please enter your details</div>
        <Form :resolver @submit="onFormSubmit">
          <div class="form-inputs">
            <FormField v-slot="$field" name="username" initialValue="hanoi01">
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
            <div>
              <FormField v-slot="$field" name="password" initialValue="password">
                <FloatLabel>
                  <InputText
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
              <div v-if="!showFormSignUp" class="forgot-password">
                <div></div>
                <div class="text">Forgot password?</div>
              </div>
            </div>
            <FormField v-slot="$field" v-if="showFormSignUp" name="confirmPassWord" initialValue="">
              <FloatLabel>
                <InputText
                  v-model="$field.value"
                  type="password"
                  :disabled="isLoading"
                  :class="[{ error: $field?.invalid }]"
                  @input="$field.onInput"
                  @blur="$field.onBlur"
                  @change="$field.onChange"
                  id="confirmPassWord"
                />
                <label for="confirmPassWord">Confirm Password</label>
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
          <Button
            :loading="isLoading"
            type="submit"
            :label="showFormSignUp ? 'Sign Up' : 'Login'"
            class="btn-submit"
          />
        </Form>
        <div class="socials-login">
          <div class="line">
            <hr />
            <span> Or continue with </span>
          </div>
          <div
            class="socials"
          >
            <Image
              src="./fb-icon.png"
              alt="img"
              class="facebook"
            />
            <Image
              src="./gg-icon.png"
              alt="img"
              class="google"
            />
            <Image
              src="./apple-icon.png"
              alt="img"
              class="apple"
            />
          </div>
        </div>
        <div class="text-register">
          {{ showFormSignUp ? 'Already have an account?' : "Don't have an account?" }}
          <span @click="handleChangeForm">{{
            showFormSignUp ? 'Login now' : 'Request Now'
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
