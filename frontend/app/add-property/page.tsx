"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { addProperty, getOwners } from "@/api";
import { Owner } from "@/models";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { PlusIcon } from "lucide-react";
import AddOwner from "@/components/AddOwnerForm";
import { useRouter } from "next/navigation";

export default function AddProperty() {
    const router = useRouter();

    const [owners, setOwners] = useState<Owner[]>([]);
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("user") ?? "{}").id === undefined) {
            router.push("/login");
        }
        (async () => {
            setOwners(await getOwners());
        })();
    }, []);
    const [formData, setFormData] = useState({
        address: "",
        type: "",
        price: 0,
        area: 0,
        status: "",
        bedrooms: 0,
        bathrooms: 0,
        is_finished: false,
        owner_id: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string | boolean) => {
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="p-6">
            <h1 className="mb-6 text-3xl font-bold">
                Добавить новую недвижимость
            </h1>
            <form className="max-w-md space-y-4" action={addProperty}>
                <div>
                    <Input
                        id={"photos"}
                        name={"photos"}
                        type={"file"}
                        accept={"image/*"}
                        multiple
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="address">Адрес</Label>
                    <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="type">Тип недвижимости</Label>
                    <Select
                        name="type"
                        onValueChange={(value) =>
                            handleSelectChange("type", value)
                        }
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Выберите тип недвижимости" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="house">Дом</SelectItem>
                            <SelectItem value="apartment">Квартира</SelectItem>
                            <SelectItem value="condo">Апартаменты</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="price">Цена, ₽</Label>
                    <Input
                        id="price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="1"
                    />
                </div>
                <div>
                    <Label htmlFor="area">Площадь, м²</Label>
                    <Input
                        id="area"
                        name="area"
                        type="number"
                        value={formData.area}
                        onChange={handleChange}
                        required
                        min="1"
                    />
                </div>
                <div>
                    <Label htmlFor="status">Статус</Label>
                    <Select
                        name="status"
                        onValueChange={(value) =>
                            handleSelectChange("status", value)
                        }
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Выберите статус" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="for-sale">Продается</SelectItem>
                            <SelectItem value="for-rent">Сдается</SelectItem>
                            <SelectItem value="sold">Продано</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="bedrooms">Количество спальных комнат</Label>
                    <Input
                        id="bedrooms"
                        name="bedrooms"
                        type="number"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="bathrooms">Количество санузлов</Label>
                    <Input
                        id="bathrooms"
                        name="bathrooms"
                        type="number"
                        value={formData.bathrooms}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="is_finished"
                        name="is_finished"
                        checked={formData.is_finished}
                        onCheckedChange={(value) =>
                            handleSelectChange("is_finished", value)
                        }
                    />
                    <Label htmlFor="is_finished">Сданы ключи</Label>
                </div>
                <div>
                    <Label htmlFor="owner">Владелец</Label>
                    <div className="flex space-x-2">
                        <Select
                            name="owner_id"
                            onValueChange={(value) =>
                                handleSelectChange("owner_id", value)
                            }
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите владельца" />
                            </SelectTrigger>
                            <SelectContent>
                                {owners.map((owner) => (
                                    <SelectItem
                                        value={String(owner.id)}
                                        key={owner.id}
                                    >
                                        {owner.name} ({owner.email})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <PlusIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <AddOwner />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <Button type="submit">Добавить</Button>
            </form>
        </div>
    );
}
