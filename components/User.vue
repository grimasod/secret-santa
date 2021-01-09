<template>
  <div class="border rounded flex flex-col items-center p-2">
    <img :src="user.picture" alt="user.name profile picture">
    <span class="text-red-500">{{ user.name }}</span>
    <div class="flex items-center">
      <span class="">
        Is Participating:
      </span>
      <button
        class="ml-2 h-8 w-8 button-plain"
        :disabled="isDisabled"
        @click="isParticipating = !isParticipating"
      >
        <fa v-show="!isParticipating" icon="times" class="text-gray-300" />
        <fa v-show="isParticipating" icon="check" />
      </button>
    </div>
    <div class="w-full flex flex-wrap items-center p-1 mt-2 border rounded border-blue-200 bg-blue-50 text-blue-300">
      <span class="w-1/4">
        For:
      </span>
      <span class="w-3/4">
        {{ gifteeName }}
      </span>
      <span class="w-1/4">
        From:
      </span>
      <span class="w-3/4">
        {{ gifterName }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'User',
  props: {
    user: {
      type: Object,
      required: true
    },
    isDisabled: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      users: 'users/getAllUsers'
    }),
    isParticipating: {
      get () {
        return this.user.isParticipating
      },
      set (value) {
        this.$store.dispatch('users/setIsParticipating', { id: this.user.id, isParticipating: value })
      }
    },
    gifteeName () {
      let name = ''
      if (this.user.gifteeId) {
        const giftee = this.users.find(user => user.id === this.user.gifteeId)
        if (giftee) {
          name = giftee.name
        }
      }
      return name
    },
    gifterName () {
      let name = ''
      const gifter = this.users.find(user => user.gifteeId === this.user.id)
      if (gifter) {
        name = gifter.name
      }
      return name
    }
  }
}
</script>
