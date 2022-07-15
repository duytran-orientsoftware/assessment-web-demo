import { MockData } from "../mocks/data.mock";

const randomNumber = (max = 20) => {
  return Math.floor(Math.random() * max);
};

const randomFirstName = () => {
  return MockData.FIRST_NAME[randomNumber()];
};

const randomLastName = () => {
  return MockData.LAST_NAME[randomNumber()];
};

const randomAge = () => {
  return MockData.AGE[randomNumber()];
};

const randomGender = () => {
  return MockData.GENDER[randomNumber()];
};

const randomPhone = () => {
  return MockData.PHONE[randomNumber()];
};

const randomJobType = () => {
  return MockData.JOB_TYPE[randomNumber()];
};

const randomJobTitle = () => {
  return MockData.JOB_TITLE[randomNumber()];
};

const randomArea = () => {
  return MockData.JOB_AREA[randomNumber()];
};

const randomAddress = () => {
  return MockData.ADDRESS[randomNumber()];
};

const randomState = () => {
  return MockData.STATE[randomNumber()];
};

const randomCity = () => {
  return MockData.CITY[randomNumber()];
};

const randomZipCode = () => {
  return MockData.ZIP[randomNumber()];
};

const randomCar = () => {
  return MockData.CAR[randomNumber()];
};

const randomSongName = () => {
  return MockData.SONG_NAME[randomNumber()];
};

export const randomGenerateData = () => {
  return {
    firstName: randomFirstName(),
    lastName: randomLastName(),
    age: randomAge(),
    gender: randomGender(),
    phone: randomPhone(),
    jobType: randomJobType(),
    jobTitle: randomJobTitle(),
    jobArea: randomArea(),
    address: randomAddress(),
    state: randomState(),
    city: randomCity(),
    zip: randomZipCode(),
    car: randomCar(),
    songName: randomSongName(),
  };
};
