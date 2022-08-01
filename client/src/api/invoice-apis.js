import { INVOICES } from './endpoints';

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
}

export async function getInvoiceList({ limit = 100, page }) {
    let URI = `${INVOICES}/?limit=${limit}${page ? '$page=' + page : ''}`;
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
    if (res.ok) return res.json();
}

export async function createInvoice(invoice) {
    let URI = `${INVOICES}`;
    let CONFIG = {
        method: "POST",
        headers,
        body: JSON.stringify(invoice)
    };
    const res = await fetch(URI, CONFIG);
    return res.json();
}