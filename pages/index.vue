<template>
  <div class="main">
    <h1 class="">
      Welcome to the Secret Santa app!
    </h1>
    <div v-if="isConfigured" class="py-6">
      <span class="font-bold">
        It looks like you're ready to play Secret Santa!
      </span>
      <div class="pt-6">
        Please
        <NuxtLink to="/play" class="underline">
          continue to the play page
        </NuxtLink>
      </div>
    </div>
    <div v-else class="py-6">
      <span class="font-bold">
        It looks like you haven't added any participants yet.
      </span>
      <ul class="">
        <li>
          Please go to the
          <NuxtLink to="/setup" class="underline">
            setup page
          </NuxtLink>
        </li>
        <li>
          You can adda as many participants as you like
        </li>
        <li>
          Then pass around this device so everyone can be assigned a giftee
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      isConfigured: 'users/getIsConfigured'
    })
  }
}
</script>
