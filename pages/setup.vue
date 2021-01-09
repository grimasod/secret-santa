<template>
  <div class="main">
    <h1 class="">
      Secret Santa app setup
    </h1>
    <div class="pt-4">
      You are logged in as the administrator for <span class="font-bold text-green-700">example.com</span>
    </div>
    <!-- Setup steps -->
    <div class="py-6 grid grid-cols-3 gap-6 items-center justify-center">
      <div class="col-span-3 md:col-start-2 md:col-span-2 border rounded border-blue-200 bg-blue-50 text-blue-300 p-4">
        <div>
          Sections in blue are for testing purposes only
        </div>
        Enter number of participants:
        <input v-model.number="numUsers" class="ml-2 border border-blue-200 w-10 p-1">
      </div>
      <div class="col-span-3 md:col-span-1 text-center col-start-1">
        Step 1
      </div>
      <button class="col-span-3 md:col-span-1 button-green" :disabled="users.length > 0" @click="getUsers">
        Get registered participants
        <fa icon="exchange-alt" class="text-xl ml-2" />
      </button>
      <button class="col-span-3 md:col-span-1 button-red" :disabled="users.length === 0" @click="resetAll">
        Reset
        <fa icon="undo-alt" class="text-xl ml-2" />
      </button>
      <div class="col-span-3 md:col-span-1 text-center">
        Step 2
      </div>
      <div class="col-span-3 md:col-span-2">
        De-select anyone listed below who will not participate
      </div>
      <div class="col-span-3 md:col-span-1 text-center">
        Step 3
      </div>
      <button class="col-span-3 md:col-span-1 button-green" :disabled="(users.length === 0) || isConfigured" @click="setIsConfigured">
        Setup Finished
        <fa icon="magic" class="text-xl ml-2" />
      </button>
      <button class="col-span-3 md:col-span-1 button-red" :disabled="!isConfigured" @click="resetAssigned">
        Reset
        <fa icon="undo-alt" class="text-xl ml-2" />
      </button>
    </div>
    <!-- User admin -->
    <template v-if="users.length > 0">
      <div class="pt-6 w-full text-red-500">
        <span class="font-bold">{{ users.length }} people</span> have registered for your Secret Santa.
      </div>
      <div class="pt-1 w-full text-red-500">
        <span class="font-bold">{{ participants.length }} people</span> are selected to participate.
        <span v-if="errorTooFew" class="font-bold">
          Sorry, Secret Santa can't be played with fewer than 3 participants!
        </span>
      </div>
      <div class="py-6 w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center">
        <user v-for="user in users" :key="user.id" :user="user" :is-disabled="isConfigured" />
      </div>
    </template>
    <!-- Modal popups -->
    <modal v-show="fetchingUsers" :spinner="true">
      Fetching registered participants...
    </modal>
    <modal v-show="confirmReset">
      <div v-if="confirmReset" class="">
        {{ confirmText.mainText }}
        <p class="mt-2 italic text-red-500">
          {{ confirmText.subText }}
        </p>
      </div>
      <div class="flex justify-between pt-6">
        <button class="button button-plain" @click="confirmResetCancelled">
          Cancel
        </button>
        <button class="button button-plain" @click="confirmResetConfirmed">
          Yes - proceed
        </button>
      </div>
    </modal>
    <modal v-show="isReady" @close="closeIsReady">
      <template v-slot:header>
        <h4>You're ready to play Secret Santa!</h4>
      </template>
      <div class="">
        Please gather everyone around and
        <NuxtLink to="/play" class="underline">
          continue to the game.
        </NuxtLink>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Modal from '../components/Modal.vue'
import User from '../components/User.vue'

export default {
  name: 'Setup',
  components: {
    Modal,
    User
  },
  data () {
    return {
      fetchingUsers: false,
      confirmReset: null,
      isReady: false,
      numUsers: 15,
      errorTooFew: false
    }
  },
  computed: {
    ...mapGetters({
      users: 'users/getAllUsersSorted',
      participants: 'users/getParticipatingUsers',
      isConfigured: 'users/getIsConfigured'
    }),
    numParticipants () {
      return this.participants.length
    },
    confirmText () {
      if (this.confirmReset === 'all') {
        return {
          mainText: 'Are you sure you want to clear everything?',
          subText: 'All information will be deleted permanently.'
        }
      } else if (this.confirmReset === 'assigned') {
        return {
          mainText: 'Are you sure you want to reset Santa assignments?',
          subText: 'Assignments will be deleted permanently.'
        }
      }
      return { mainText: '', subText: '' }
    }
  },
  watch: {
    numParticipants (newVal, oldVal) {
      if (newVal > 2) {
        this.errorTooFew = false
      }
    }
  },
  methods: {
    async getUsers () {
      this.fetchingUsers = true
      await this.$store.dispatch('users/fetchUsers', { numUsers: this.numUsers })
      this.fetchingUsers = false
    },
    resetAll () {
      this.confirmReset = 'all'
    },
    resetAssigned () {
      this.confirmReset = 'assigned'
    },
    confirmResetConfirmed () {
      if (this.confirmReset === 'all') {
        this.$store.dispatch('users/clearAll', {})
      } else if (this.confirmReset === 'assigned') {
        this.$store.dispatch('users/clearAssigned', {})
      }
      this.confirmReset = null
    },
    confirmResetCancelled () {
      this.confirmReset = null
    },
    async setIsConfigured () {
      if (this.numParticipants < 3) {
        this.errorTooFew = true
      } else {
        await this.$store.dispatch('users/setIsConfigured', { status: true })
        this.isReady = true
      }
    },
    closeIsReady () {
      this.isReady = false
    }
  }
}
</script>
