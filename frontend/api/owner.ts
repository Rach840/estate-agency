"use server";

import { Owner } from "@/models";

export async function addOwner(data: Omit<Owner, "id">) {
    return await fetch(`${process.env.API_URL}/owners`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function getOwnerById(ownerId: Number): Promise<Owner> {
    const res = await fetch(`${process.env.API_URL}/owners/${ownerId}`);
    return await res.json();
}

export async function getOwners(): Promise<Owner[]> {
    const res = await fetch(`${process.env.API_URL}/owners`);
    return await res.json();
}
