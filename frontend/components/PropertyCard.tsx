import { Property } from "@/models";
import { getOwnerById, getPropertyPhotos } from "@/api";
import { Photos } from "@/app/properties/photos";
import { formatPrice, formatStatus, formatType } from "@/lib/format";
import CreatePropertyDocument from "./PropertyCardPDF";

interface PropertyCardProps {
    property: Property;
}

export default async function PropertyCard({ property }: PropertyCardProps) {
    const owner = await getOwnerById(property.owner_id ?? 0);
    const photosRaw = await getPropertyPhotos(property.id);

    return (
        <>
            <Photos photosRaw={photosRaw} />
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm font-semibold">Тип</p>
                    <p>{formatType(property.type)}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold">Цена</p>
                    <p>{formatPrice(property.price)}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold">Статус</p>
                    <p>{formatStatus(property.status)}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold">
                        Количество спальных комнат
                    </p>
                    <p>{property.bedrooms}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold">Количество санузлов</p>
                    <p>{property.bathrooms}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold">Площадь</p>
                    <p>{property.area} м²</p>
                </div>

                <div>
                    <p className="text-sm font-semibold">Завершено</p>
                    <p>{property.is_finished ? "Да" : "Нет"}</p>
                </div>
            </div>
            {owner && (
                <div className="mt-4">
                    <p className="text-sm font-semibold">
                        Информация о владельце
                    </p>
                    <p>Имя: {owner.name}</p>
                    <p>Email: {owner.email}</p>
                    <p>Телефон: {owner.phone_number}</p>
                </div>
            )}
            <CreatePropertyDocument ownerData={owner} propertyData={property}/>
        </>
    );
}
