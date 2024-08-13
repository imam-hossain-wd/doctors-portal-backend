/* eslint-disable no-unused-vars */

export const doctorSearchAbleFields: string[] = ['name', 'speciality', 'city', 'role'];

export const doctorFilterableFields: string[] = [
    'searchTerm',
    'speciality',
    'role',
    'city'
];

// speciality , role , city ,name , doctor_id

type productRelationalFieldsMapper = {
    [key: string]: string;
  };
  
 export const doctorRelationalFieldsMapper: productRelationalFieldsMapper = {
    category: 'category',
  };