const api = {
  user: 'https://randomuser.me/api/?inc=login,name,picture&nat=au,ca,gb,ie,nz,us'
}

const actions = {
  async fetchUsers ({ commit }, { numUsers }) {
    const userData = await (await fetch(`${api.user}&results=${numUsers}`)).json()
    const users = userData.results.map(user => ({
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      picture: user.picture.medium,
      isParticipating: true,
      gifteeId: null
    }))
    commit('setUsers', users)
    return users
  },
  clearAll ({ commit }) {
    commit('setUsers', [])
    commit('setIsConfigured', false)
  },
  clearAssigned ({ commit, getters }) {
    const updatedUsers = getters.getAllUsers.map(user => ({
      ...user,
      gifteeId: null
    }))
    commit('setUsers', updatedUsers)
    commit('setIsConfigured', false)
  },
  setIsConfigured ({ commit }, { status }) {
    commit('setIsConfigured', status)
  },
  setIsParticipating ({ dispatch }, { id, isParticipating }) {
    dispatch('updateSingleUser', { id, isParticipating })
  },
  async doAssign ({ getters, dispatch }, { id }) {
    const unassigned = getters.getUnassignedUsers // users who have not been assigned as someone's giftee
    let giftee = null
    if (unassigned.length === 2) {
      // special case - only 2 remaining. Have to make sure last remaining one (after this user) will not be asssigned to themself
      // assuming nothing has gone wrong before now, the number of "remaining" users will also be 2
      const remaining = getters.getRemainingParticipants // users who don't have a giftee assigned, one of them must be this user
      const onlyOther = remaining.find(user => user.id !== id) // as there are only 2, there's only one other
      // check for that other user in the list of unassigned users
      // if found then they must be assigned as the giftee for this user, to avoid being assigned to themself (or an error situation)
      // if not found, `giftee` will still be falsey and so get assigned as usual
      giftee = unassigned.find(user => user.id === onlyOther.id)
    }
    if (!giftee) {
      // usual cases - unless giftee has been set by special case above
      // filter so not assigned to self
      const options = getters.getUnassignedUsers.filter(user => user.id !== id)
      giftee = options[options.length === 1 ? 0 : Math.floor(Math.random() * options.length)]
    }
    await dispatch('updateSingleUser', { id, gifteeId: giftee.id })
  },
  async updateSingleUser ({ commit, getters }, { id, ...updateFields }) {
    const updatedUsers = getters.getAllUsers.map(user => (user.id === id) ? { ...user, ...updateFields } : user)
    await commit('setUsers', updatedUsers)
  }
}

export default actions
