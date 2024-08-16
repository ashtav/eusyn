interface Faker {
    number(length: number, startWith?: number): string;
    price(length?: number, locale?: string, prefix?: string): string;
    name(): string;
    email(domain?: string, addNumber?: boolean): string;
    phone(prefix?: string): string;
    address(): string;
    date(dateFormat?: string): string;
    gender(data?: string[]): string;
    time(): string;
    invoice(prefix?: string): string;
    password(length?: number, useSpecialChar?: boolean): string;
    image(type?: string): string
}

export default Faker