import Link from "next/link";
import { Home, Building, Users, PlusCircle, Star } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
    { title: "Панель управления", url: "/", icon: Home },
    { title: "Объекты недвижимости", url: "/properties", icon: Building },
    { title: "Сотрудники", url: "/employees", icon: Users },
    { title: "Добавить недвижимость", url: "/add-property", icon: PlusCircle },
    { title: "Оценки", url: "/markups", icon: Star },
];

const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader className={"text-2xl font-black"}>
                Агентство недвижимости
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
