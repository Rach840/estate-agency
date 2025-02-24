"use server";

import { Markup } from "@/models";

export async function getMarkups(): Promise<Markup[]> {
    const res = await fetch(`${process.env.API_URL}/markups`);
    return await res.json();
}

export async function addMarkup(markup: Omit<Markup, "id">): Promise<void> {
    await fetch(`${process.env.API_URL}/markups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(markup),
    });
}
