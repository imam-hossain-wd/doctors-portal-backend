export const productSearchAbleFields: string[] = ['hospital_name', 'email', 'city','phone_number'];

export const hospitalFilterableFields: string[] = [
    'searchTerm',
    'city',
    'rating',
];


type productRelationalFieldsMapper = {
    [key: string]: string;
  };
  
 export const productRelationalFieldsMapper: productRelationalFieldsMapper = {
    category: 'category',
  };

//   {
//     "hospital_name": "City Hospital",
//     "image": "https://example.com/image.jpg",
//     "email": "info@cityhospital.com",
//     "phone_number": "+1234567890",
//     "address": "123 Main Street",
//     "city": "Metropolis",
//     "description": "A leading hospital providing quality healthcare services.",
//     "website_link": "https://cityhospital.com"
//   }