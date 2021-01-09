<template>
  <div class="z-40 fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50" @click="close" />
    <div class="z-40 bg-white opacity-100 m-10 xl:m-20 rounded-md border-2 border-red-500">
      <div v-if="closable" class="flex justify-end px-2">
        <button class="text-xl border-none p-2 text-gray-400 hover:text-red-500" @click="close">
          <fa icon="times" />
        </button>
      </div>
      <div class="px-4 xl:px-10">
        <slot name="header" />
      </div>
      <div class="pt-2 pb-4 px-4 xl:px-10 xl:pb-10">
        <div v-if="spinner" class="flex items-center p-2">
          <fa icon="snowflake" class="animate-spin text-4xl mr-4" />
          <span class="animate-pulse text-red-600">
            <slot />
          </span>
        </div>
        <slot v-else />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    spinner: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    closable () {
      return this.$listeners && this.$listeners.close
    }
  },
  methods: {
    close () {
      if (this.closable) { this.$emit('close') }
    }
  }
}
</script>
