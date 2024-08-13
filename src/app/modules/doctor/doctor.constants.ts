/* eslint-disable no-unused-vars */

export const doctorSearchAbleFields: string[] = ['name', 'speciality', 'city', 'role'];

export const doctorFilterableFields: string[] = [
    'searchTerm',
    'speciality',
    'role',
    'city'
];

type productRelationalFieldsMapper = {
    [key: string]: string;
  };
  
 export const doctorRelationalFieldsMapper: productRelationalFieldsMapper = {
    category: 'category',
  };