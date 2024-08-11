
//generate 5 digits ramdon user id
export const generateRamdonUserId = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

//generate 5 digits ramdon hospital id
export const generateRamdonHospitalId = () => {
  return Math.floor(10000 + Math.random() * 90000);
};

export const generateRamdonDoctorId = () => {
  return Math.floor(10000 + Math.random() * 900000);
};
