"use server";

import { User } from "@/models";

export async function addUser(data: Omit<User, "id">) {
    const res = await fetch(`${process.env.API_URL}/users`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await res.json();
}

export async function editUser(id: number, data: Omit<User, "id">) {
    const res = await fetch(`${process.env.API_URL}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await res.json();
}

export async function getUsers(): Promise<User[]> {
    const res = await fetch(`${process.env.API_URL}/users`);
    return await res.json();
}

export async function getUserById(id: Number): Promise<User> {
    const res = await fetch(`${process.env.API_URL}/users/${id}`);
    return await res.json();
}

export async function deleteUser(id: number) {
    const res = await fetch(`${process.env.API_URL}/users/${id}`, {
        method: "DELETE",
    });
    return await res.json();
}
