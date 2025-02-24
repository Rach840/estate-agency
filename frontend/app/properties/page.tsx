
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/api";
import { EyeIcon, PenIcon } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import EditProperty from "@/components/EditPropertyForm";
import { formatPrice, formatStatus, formatType } from "@/lib/format";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import Html, { fetchStylesheets } from 'react-pdf-html';
import { useEffect, useState } from "react";
import { Property } from "@/models";
import { link } from "fs";
import ExportButton from "@/components/export-button";
export default async function Properties() {
    const propertiesList = await getProperties();
const propertiesListRussia = propertiesList.map(item => {
    return {
        Адресс: item.address,
        Тип: item.type == 'house'? 'Дом' : item.type == 'apartment' ? 'Квартира' : 'Апартаменты',
            Цена: item.price,
        Площадь: item.area,
        Спальни: item.bedrooms,
        Санузлов: item.bathrooms,
        Окончен: item.area,
        Статус: item.status == 'for-sale'? 'Продается' : item.status == 'for-rent' ? 'Сдается' : 'Продано',
        Id_Покупателя : item.owner_id,
        Создан: item.createdAt,
        Обновлен: item.updatedAt,

    }
})
    return (
        <div className="p-6">
            {/* {propertiesList ?   <PDFDownloadLink  document={<MyDocument/>} fileName="somename.pdf"  >Скачать</PDFDownloadLink> : ''} */}
            <div className="flex items-center justify-between">
            <h1 className="mb-6 text-3xl font-bold">Недвижимость</h1>
                <ExportButton response={propertiesListRussia} />
            </div>
          
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Адрес</TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Цена</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Оценка</TableHead>
                        <TableHead>Действие</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {propertiesList?.map((property) => (
                        <TableRow key={property.id}>
                            <TableCell>{property.address}</TableCell>
                            <TableCell>{formatType(property.type)}</TableCell>
                            <TableCell>{formatPrice(property.price)}</TableCell>
                            <TableCell>
                                {formatStatus(property.status)}
                            </TableCell>
                            <TableCell>0</TableCell>
                            {/* <TableCell>{property.rating.toFixed(1)}</TableCell> */}
                            {/* <TableCell>{calculateMark(property).toFixed(1)}</TableCell> */}
                            <TableCell className="space-x-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <EyeIcon />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                {property.address}
                                            </DialogTitle>
                                        </DialogHeader>
                                        <PropertyCard property={property} />
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={"w-full"}
                                                >
                                                    Закрыть
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <PenIcon />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Редактирование недвижимости
                                            </DialogTitle>
                                        </DialogHeader>
                                        <EditProperty data={property} />
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
