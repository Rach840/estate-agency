"use client";

import { User } from "@/models";
import { useRouter } from "next/navigation";

export function Login({ user }: { user: User }) {
    const router = useRouter();
    localStorage.setItem("user", JSON.stringify(user));
    router.push(
        `${process.env.NEXT_PUBLIC_APP_URL}/get-cookie?user=${JSON.stringify(user)}`,
    );
    return <></>;
}
