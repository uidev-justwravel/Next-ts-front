// Global TypeScript declarations
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

export { }; // This file needs to be treated as a module
