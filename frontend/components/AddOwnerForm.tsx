"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addOwner } from "@/api";

export default function AddOwner() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_number: "",
        status: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = () => {
        (async () => {
            await addOwner(formData);
        })();
    };

    return (
        <div className="p-6">
            <h1 className="mb-6 text-lg font-bold">
                Добавить нового собственника
            </h1>
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
                    <Label htmlFor="phone_number">Номер телефона</Label>
                    <Input
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Button type="submit">Добавить</Button>
            </form>
        </div>
    );
}
