export const vehicleRules = Object.freeze({
  PLATE_MIN_LENGTH: 5,
  PLATE_MAX_LENGTH: 8,
  MODEL_NAME_LENGTH: 15,
  NOTE_LENGTH: 200,
});

export const vehicleOnTaskRules = Object.freeze({
  NAME_MIN_LENGTH: 4,
  NAME_MAX_LENGTH: 30,
  ADDRESS_LENGTH: 50,
  AUTHORIZED_PERSON_LENGTH: 30,
});

export const userRules = Object.freeze({
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 15,

  SURNAME_MIN_LENGTH: 4,
  SURNAME_MAX_LENGTH: 15,

  USERNAME_MIN_LENGTH: 5,
  USERNAME_MAX_LENGTH: 20,

  PASSWORD_MIN_LENGTH: 4,
  PASSWORD_MAX_LENGTH: 20,

  AUTHORIZED_PERSON_LENGTH: 30,
});

export const driverRules = Object.freeze({
  NAME_LENGTH: 20,
  SURNAME_LENGTH: 20,
  MISSION_LENGTH: 30,
});

export const ownerRules = Object.freeze({
  NAME_LENGTH: 25,
});

export const departmentRules = Object.freeze({
  NAME_LENGTH: 25,
});

export const brandRules = Object.freeze({
  NAME_LENGTH: 25,
});
