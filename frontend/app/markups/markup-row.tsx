import { TableCell, TableRow } from "@/components/ui/table";
import { Markup } from "@/models";
import { getPropertyById, getUserById } from "@/api";
import { formatType } from "@/lib/format";

export async function MarkupRow({ markup }: { markup: Markup }) {
    const property = await getPropertyById(markup.property_id);
    const staff = await getUserById(markup.staff_id);

    return (
        <TableRow key={markup.id}>
            <TableCell>{property.address}</TableCell>
            <TableCell>{formatType(property.type)}</TableCell>
            <TableCell>{markup.value}</TableCell>
            <TableCell>{staff.name}</TableCell>
            <TableCell>{new Date(markup.date ?? "").toLocaleDateString()}</TableCell>
        </TableRow>
    );
}
