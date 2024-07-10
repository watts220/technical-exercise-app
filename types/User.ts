export interface User {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    nino: string;
    address: {
        addressLine1: string;
        addressLine2: string;
        addressLine3: string;
        city: string;
        postCode: string;
        country: string;
    };
    paymentDetails: {
        accountType: string;
        accountName: string;
        sortCode: string;
        accountNumber: string;
    };
    avatar: string;
}
