export default interface Card {
    id?: number;
    userId: number;
    title: string;
    subtitle: string;
    description: string;
    email: string;
    web?: string;
    phone: string;
    imageUrl: string;
    imageAlt: string;
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNumber?: number;
    zipCode?: string;
    coverImg: string;
}