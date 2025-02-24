"use server";

export async function auth(formData: FormData) {
    const res = await fetch(`${process.env.API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.get("email") }),
    });
    return await res.json();
}

export async function checkLink(link: string) {
    const res = await fetch(`${process.env.API_URL}/login/${link}`);
    const user = await res.json();
    if (!res.ok) return;
    return user;
}
