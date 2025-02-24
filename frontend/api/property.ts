"use server";
import React from "react";
import { File, Property } from "@/models";
export async function addProperty(data: FormData) {
    await fetch(`${process.env.API_URL}/properties`, {
        method: "POST",
        body: data,
    });
}

export async function editProperty(id: number, data: Omit<Property, "id">) {
    console.log(data);
    const res = await fetch(`${process.env.API_URL}/properties/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await res.json();
}

export async function getProperties(): Promise<Property[]> {
    const res = await fetch(`${process.env.API_URL}/properties`);
    return await res.json();
}

export async function getPropertyPhotos(id: Number): Promise<File[]> {
    const res = await fetch(`${process.env.API_URL}/properties/${id}/photos`);
    return await res.json();
}

export async function getPropertyById(id: Number): Promise<Property> {
    const res = await fetch(`${process.env.API_URL}/properties/${id}`);
    return await res.json();
}
