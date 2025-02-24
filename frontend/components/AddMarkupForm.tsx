"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addMarkup, getProperties } from "@/api";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Property } from "@/models";
import { formatType } from "@/lib/format";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { ru } from "date-fns/locale";

export default function AddMarkup() {
    const [properties, setProperties] = useState<Property[]>([]);
    useEffect(() => {
        (async () => {
            setProperties(await getProperties());
        })();
    }, []);
    const [formData, setFormData] = useState({
        property_id: 0,
        value: 0,
        date: undefined as Date | undefined,
        staff_id: (JSON.parse(localStorage.getItem("user") ?? "{}")?.id ??
            0) as number,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        (async () => {
            await addMarkup(formData);
            window.location.reload();
        })();
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
            <div>
                <Label htmlFor="property_id">Недвижимость</Label>
                <Select
                    name="property_id"
                    onValueChange={(value) =>
                        handleSelectChange("property_id", value)
                    }
                    required
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите недвижимость" />
                    </SelectTrigger>
                    <SelectContent>
                        {properties.map((property) => (
                            <SelectItem
                                value={String(property.id)}
                                key={property.id}
                            >
                                {property.address} ({formatType(property.type)})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="value">Оценка</Label>
                <Input
                    id="value"
                    name="value"
                    type={"number"}
                    value={formData.value}
                    onChange={handleChange}
                    min={0}
                    max={10}
                    required
                />
            </div>
            <div>
                <Label htmlFor={"date"}>Дата</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full min-w-[350px] justify-start text-left font-normal",
                                !formData.date && "text-muted-foreground",
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.date ? (
                                format(formData.date, "PPP", {
                                    locale: ru,
                                })
                            ) : (
                                <span>Выберите дату</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            locale={ru}
                            selected={formData.date}
                            onSelect={(v) =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    date: v,
                                }))
                            }
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <Button type="submit">Добавить</Button>
        </form>
    );
}
