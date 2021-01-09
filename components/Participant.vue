<template>
  <button
    class="button-plain flex-col"
    :disabled="participant.gifteeId"
    @click="clickHandler"
  >
    <img :src="participant.picture" alt="participant.name profile picture" class="mb-2">
    {{ participant.name }}
  </button>
</template>

<script>
export default {
  name: 'Participant',
  props: {
    participant: {
      type: Object,
      required: true
    }
  },
  computed: {
  },
  methods: {
    clickHandler () {
      this.$emit('click', this.participant.id)
    }
  }
}
</script>
