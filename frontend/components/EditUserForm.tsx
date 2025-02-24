"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editUser } from "@/api";
import { User } from "@/models";

export default function EditUser({ user }: { user: User }) {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = () => {
        (async () => {
            await editUser(user.id, formData);
        })();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
            <div>
                <Label htmlFor="name">Имя</Label>
                <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="email">Почта</Label>
                <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="role">Роль</Label>
                <Input
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                />
            </div>
            <Button type="submit">Добавить</Button>
        </form>
    );
}
