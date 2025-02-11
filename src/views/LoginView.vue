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

const router = useRouter()
const isLoading = ref(false)
const showFormSignUp = ref(false)
const toast = useToast()

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
  <div class="w-dvw h-dvh bg-black p-5">
    <div
      class="fixed -translate-x-2/4 -translate-y-2/4 bg-[#d8d8d8] shadow-[rgba(149,157,165,0.2)_0px_8px_24px] overflow-hidden max-w-fit md:max-w-[800px] w-full flex min-h-fit justify-between rounded-md md:rounded-2xl left-2/4 top-2/4"
    >
      <div class="p-[30px] text-center md:block hidden">
        <Image src="/bg-login.png" alt="img-login" class="w-[350px]" />

        <div class="text-xs text-[#333] text-center !mt-20">
          {{ showFormSignUp ? 'Already have an account?' : "Don't have an account?" }}
          <span class="!font-bold cursor-pointer" @click="handleChangeForm">{{
            showFormSignUp ? 'Login now' : 'Request Now'
          }}</span>
        </div>
      </div>
      <div class="w-[46%] min-w-[360px] bg-white text-center !m-2 p-[30px] md:p-[50px] rounded-xl">
        <h1 class="text-[24px] md:text-[28px] !font-bold w-full whitespace-nowrap">
          {{ showFormSignUp ? 'Create new account' : 'Welcome Back!' }}
        </h1>
        <div class="text-xs text-[#575656] font-medium whitespace-nowrap !mb-4 md:!mb-[30px]">
          Please enter your details
        </div>
        <Form
          :resolver
          @submit="onFormSubmit"
          class="w-full flex flex-col gap-4 md:gap-6 justify-between h-fit"
        >
          <div class="w-full flex flex-col h-auto gap-8 md:gap-5">
            <FormField
              v-slot="$field"
              name="username"
              initialValue=""
              class="h-[40px] md:h-[55px] text-start"
            >
              <FloatLabel>
                <InputText
                  type="text"
                  :disabled="isLoading"
                  :class="[{ error: $field?.invalid }]"
                  v-bind="$field.props"
                  id="username"
                />
                <label for="username" class="text-xs md:text-sm text-[#333] left-0"
                  >Your Name</label
                >
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
              <FormField
                v-slot="$field"
                name="password"
                initialValue=""
                class="h-[40px] md:h-[55px] text-start"
              >
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
                  <label for="password" class="text-xs md:text-sm text-[#333] left-0"
                    >Your Password</label
                  >
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
              <div v-if="!showFormSignUp" class="flex text-xs justify-between !mt-2 md:!mt-0">
                <div class="flex items-center gap-1 text-[#504f4f]">
                </div>
                <div class="cursor-pointer underline">Forgot password?</div>
              </div>
            </div>
            <FormField
              v-slot="$field"
              v-if="showFormSignUp"
              name="confirmPassWord"
              initialValue=""
              class="h-[40px] md:h-[55px] text-start"
            >
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
                <label for="confirmPassWord" class="text-xs md:text-sm text-[#333] left-0"
                  >Confirm Password</label
                >
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
            class="text-[white] h-10 items-center !font-semibold rounded-[20px] bg-[#333]"
          />
        </Form>
        <div class="text-center !mt-5 md:!mt-10">
          <div class="relative text-[#575656] h-5">
            <hr
              class="absolute w-full text-[#d8d0d0] -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4"
            />
            <span
              class="absolute -translate-x-2/4 w-2/5 bg-[white] font-semibold text-xs left-2/4 top-0"
            >
              Or continue with
            </span>
          </div>
          <div
            class="flex items-center h-fit w-full gap-7 md:gap-10 justify-center mx-auto !mt-4 md:!mt-8"
          >
            <Image
              src="./fb-icon.png"
              alt="img"
              class="w-[30px] h-[30px] md:w-[38px] md:h-[38px] block cursor-pointer"
            />
            <Image
              src="./gg-icon.png"
              alt="img"
              class="w-[26px] h-[26px] md:w-[35px] md:h-[40px] block cursor-pointer"
            />
            <Image
              src="./apple-icon.png"
              alt="img"
              class="w-[25px] h-[25px] md:w-[34px] md:h-[34px] block cursor-pointer"
            />
          </div>
        </div>
        <div class="text-xs text-[#333] text-center !mt-4 md:hidden">
          {{ showFormSignUp ? 'Already have an account?' : "Don't have an account?" }}
          <span class="!font-bold cursor-pointer" @click="handleChangeForm">{{
            showFormSignUp ? 'Login now' : 'Request Now'
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
input {
  width: 100%;
  color: var(--p-inputtext-color);
  background: var(--p-inputtext-background);
  border: unset;
  border-radius: 0;
  border-bottom: 2px solid #333;
  outline: none;
  box-shadow: unset;
  font-size: 14px;
  padding: 5px;
}

input::placeholder {
  opacity: 0.8;
  font-weight: 400;
  font-size: 14px;
}

input.error {
  border-color: red;
}
</style>
