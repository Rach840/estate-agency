import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, RussianRuble, Users } from "lucide-react";
import { getOverview } from "@/api";
import { formatPrice } from "@/lib/format";

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
    const overview = await getOverview();
    console.log(overview)
    return (
        <div className="p-6">
            <h1 className="mb-6 text-3xl font-bold">Панель управления</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Общее количество объектов
                        </CardTitle>
                        <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {overview.totalObjects}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Общая цена всей недвижимости
                        </CardTitle>
                        <RussianRuble  className='h-4 w-4 text-muted-foreground'/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatPrice(overview.totalSalary)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Общее количество сотрудников
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {overview.totalUsers}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
