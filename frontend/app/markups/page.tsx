import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getMarkups } from "@/api";
import { MarkupRow } from "@/app/markups/markup-row";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import AddMarkup from "@/components/AddMarkupForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Markups() {
    const store = await cookies();
    if (JSON.parse(store.get("user")?.value ?? "{}").id === undefined) {
        return redirect("/login");
    }

    const markups = await getMarkups();

    return (
        <div className="p-6">
            <div className={"flex justify-between"}>
                <h1 className="mb-6 text-3xl font-bold">Оценка недвижимости</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size={"icon"}>
                            <PlusIcon />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Добавить оценку</DialogTitle>
                        </DialogHeader>
                        <AddMarkup />
                    </DialogContent>
                </Dialog>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Адрес</TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Оценка</TableHead>
                        <TableHead>Сотрудник</TableHead>
                        <TableHead>Дата</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {markups.map((markup) => (
                        <MarkupRow markup={markup} key={markup.id} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
