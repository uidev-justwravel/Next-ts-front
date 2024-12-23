// User Type
declare global {
  interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: {
      color: string;
      type: string;
    };
    ip: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
    macAddress: string;
    university: string;
    bank: {
      cardExpire: string;
      cardNumber: string;
      cardType: string;
      currency: string;
      iban: string;
    };
    company: {
      department: string;
      name: string;
      title: string;
      address: {
        address: string;
        city: string;
        state: string;
        stateCode: string;
        postalCode: string;
        coordinates: {
          lat: number;
          lng: number;
        };
        country: string;
      };
    };
  }
}

declare global {
  interface BasicUser {
    firstName: string;
    lastName: string;
    age: number;
  }
}

declare global {
  interface Lead {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    country_code: number;
    phone: number;
    instagram_user_name: string;
    location: string;
    package_id: string;
    package_name: string;
    no_of_days: number;
    pax: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
}


declare global {
  interface FormLead {
    first_name: string;
    last_name: string;
    email: string;
    country_code: number;
    phone: number;
    instagram_user_name: string;
    location: string;
    package_id: number;
    package_name: string;
    no_of_days: number;
    pax: number;
  }
}
export {};
