const getters = {
  getAllUsers: state => state.allUsers,
  getAllUsersSorted: (state, getters) => [...getters.getAllUsers].sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0),
  getParticipatingUsers: (state, getters) => getters.getAllUsersSorted.filter(user => user.isParticipating),
  getRemainingParticipants: (state, getters) => getters.getParticipatingUsers.filter(user => !user.gifteeId),
  getUnassignedUsers: (state, getters) => getters.getParticipatingUsers.filter(giftee => !getters.getParticipatingUsers.some(gifter => gifter.gifteeId === giftee.id)),
  getIsConfigured: state => state.isConfigured
}

export default getters
