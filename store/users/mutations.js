const mutations = {
  setUsers (state, users) {
    state.allUsers = users
  },
  setIsConfigured (state, status) {
    state.isConfigured = status
  }
}

export default mutations
