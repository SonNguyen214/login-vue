<template>
  <Button
    @click="() => emit('handleClick')"
    :label="label"
    :class="'custom-button ' + checkButton()"
    :loading="isLoading"
    :type="type"
  />
</template>

<script setup>
const props = defineProps({
  label: String,
  variant: String,
  isLoading: Boolean,
  type: String,
})

const emit = defineEmits(['handleClick'])

const checkButton = () => {
  switch (props.variant) {
    case 'login':
      return 'btn-login'
    case 'logout':
      return 'btn-logout'
    case 'cancel':
      return 'btn-cancel'
    case 'active':
      return 'btn-active'
    default:
      return ''
  }
}
</script>
