const createTokenUser = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    organizer: user.organizer,
  };
};

const createTokenParticipant = (participant) => {
  return {
    id: participant._id,
    firstName: participant.firstName,
    lastName: participant.lastName,
    email: participant.email,
  };
};

module.exports = {
  createTokenUser,
  createTokenParticipant,
};
