import { PRODUCTS } from './endpoints';

export async function getProducts() {
    let URI = `${PRODUCTS}`;
    let CONFIG = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    };
    const res = await fetch(URI, CONFIG);
    return await res.json();
}