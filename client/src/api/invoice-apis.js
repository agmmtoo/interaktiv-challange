import { INVOICES } from './endpoints';

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
}

export async function getInvoiceList({ limit = 5, page = 1 }) {
    let URI = `${INVOICES}/?limit=${limit}&page=${page}`;
    let CONFIG = {
        method: "GET",
        headers
    };
    const res = await fetch(URI, CONFIG);
    return await res.json();
}

export async function getInvoice({ invoiceId }) {
    let URI = `${INVOICES}/${invoiceId}`;
    let CONFIG = {
        method: "GET",
        headers,
    };
    const res = await fetch(URI, CONFIG);
    return res.json();
}