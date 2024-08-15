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

declare module '#app' {
    interface NuxtApp {
        $faker: Faker;
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $faker: Faker;
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $faker: Faker;
    }
}

export default Faker