<template>
  <div class="main">
    <h1 class="">
      Let's play Secret Santa.
    </h1>
    <div class="py-6 w-full ">
      <!-- Not configured yet - link to setup page -->
      <div v-if="!isConfigured" class="text-center">
        <span class="font-bold">
          It looks like you haven't finished setting up yet.
        </span>
        Please go to the
        <NuxtLink to="/setup" class="underline">
          setup page
        </NuxtLink>
      </div>
      <!-- No user chosen - show list of all participaters -->
      <template v-else-if="!assigningTo">
        <div class="w-full text-center">
          Click on <span class="font-bold">your own name / picture</span> to find out who you'll get a gift for
        </div>
        <div class="pt-4 text-red-500">
          <span class="font-bold">{{ participants.length }} people</span> are playing.
        </div>
        <div class="pt-1 text-red-500">
          <span class="font-bold">{{ usassigned.length }} people</span> haven't got a giftee yet.
        </div>
        <div class="py-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-center">
          <participant v-for="participant in participants" :key="participant.id" :participant="participant" @click="setGiftee(participant.id)" />
        </div>
      </template>
      <!-- User has clicked on their avatar - confirm before reveal, to avoid mistakes -->
      <template v-else-if="!isConfirmed">
        <div class="w-full text-center">
          Hi <span class="font-bold">{{ assigningToParticipant.name }}</span>,
          please click <span class="font-bold">Reveal</span> to see who you will get a gift for.
        </div>
        <div class="w-full text-center py-6">
          If you accidentaly clicked on the wrong person, please click <span class="font-bold text-red-400">Cancel</span> and try again
        </div>
        <div class="w-full text-center pb-6 text-red-400">
          <span class="font-bold">Remember</span> Santa knows if you've been naughty!
        </div>
        <div class="grid grid-cols-2 p-6 gap-12">
          <button class="button-red" @click="cancelConfirm">
            Cancel
            <fa icon="ban" class="text-xl ml-2" />
          </button>
          <button class="button-green" @click="doAssign">
            Reveal
            <fa icon="magic" class="text-xl ml-2" />
          </button>
        </div>
      </template>
      <!-- Reveal the participant that this user will get a gift for -->
      <template v-else>
        <div class="w-full text-center">
          <span class="font-bold">{{ assigningToParticipant.name }}</span>, please get a gift for:
        </div>
        <div v-if="assignedGiftee" class="border border-red-400 text-center p-6 my-10 md:mx-10 lg:mx-40">
          <div class="flex items-center justify-between">
            <fa icon="gift" class="text-5xl sm:text-8xl ml-6 animate animate-wiggle text-red-400" />
            <div class="flex flex-col items-center">
              <img :src="assignedGiftee.picture" alt="participant.name profile picture" class="mb-2">
            </div>
            <fa icon="gift" class="text-5xl sm:text-8xl mr-6 animate animate-wiggle text-red-400" />
          </div>
          {{ assignedGiftee.name }}
        </div>
        <div class="w-full flex justify-center">
          <button class="button-green w-40" @click="doReturn">
            Return
            <fa icon="arrow-left" class="text-xl ml-2" />
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Participant from '../components/Participant.vue'

export default {
  name: 'Play',
  components: {
    Participant
  },
  data () {
    return {
      assigningTo: null,
      isConfirmed: false
    }
  },
  computed: {
    ...mapGetters({
      isConfigured: 'users/getIsConfigured',
      participants: 'users/getParticipatingUsers',
      usassigned: 'users/getUnassignedUsers'
    }),
    assigningToParticipant () {
      return this.assigningTo ? this.participants.find(participant => participant.id === this.assigningTo) : null
    },
    assignedGiftee () {
      if (!this.isConfirmed || !this.assigningToParticipant || !this.assigningToParticipant.gifteeId) {
        return null
      }
      return this.participants.find(participant => participant.id === this.assigningToParticipant.gifteeId)
    }
  },
  methods: {
    setGiftee (id) {
      this.assigningTo = id
    },
    cancelConfirm () {
      this.assigningTo = null
    },
    async doAssign () {
      await this.$store.dispatch('users/doAssign', { id: this.assigningToParticipant.id })
      this.isConfirmed = true
    },
    doReturn () {
      this.assigningTo = null
      this.isConfirmed = false
    }
  }
}
</script>
