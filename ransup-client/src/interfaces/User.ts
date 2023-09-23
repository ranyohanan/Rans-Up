export default interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    phone?: string;
    imageUrl?: string;
    imageAlt?: string;
    state?: string;
    country?: string;
    city?: string;
    street?: string;
    houseNumber?: number;
    zipCode?: string;
    userType?: string;
}