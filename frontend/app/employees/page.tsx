import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getUsers } from "@/api";
import { PenIcon, PlusIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import AddUser from "@/components/AddUserForm";
import EditUser from "@/components/EditUserForm";
import { DeleteButton } from "@/app/employees/delete-button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Employees() {
    const store = await cookies();
    if (JSON.parse(store.get("user")?.value ?? "{}").id === undefined) {
        return redirect("/login");
    }

    const employees = await getUsers();

    return (
        <div className="p-6">
            <div className="flex justify-between">
                <h1 className="mb-6 text-3xl font-bold">Сотрудники</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="icon">
                            <PlusIcon />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Добавление сотрудника</DialogTitle>
                        </DialogHeader>
                        <AddUser />
                    </DialogContent>
                </Dialog>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Имя</TableHead>
                        <TableHead>Должность</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Действие</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell>{employee.role}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell className="space-x-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <PenIcon />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Редактирование сотрудника
                                            </DialogTitle>
                                        </DialogHeader>
                                        <EditUser user={employee} />
                                    </DialogContent>
                                </Dialog>
                                <DeleteButton id={employee.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
