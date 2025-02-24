import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CheckEmailPage({
    searchParams,
}: {
    searchParams: Promise<{ email: string }>;
}) {
    const email = (await searchParams).email || "";

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle>Проверьте почту</CardTitle>
                        <CardDescription>
                            Мы прислали ссылку для входа
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-center">
                            Мы прислали ссылку для входа в аккаунт{" "}
                            <strong>{email}</strong>. Пожалуйста, откройте свою
                            почту и зайдите по ссылке.
                        </p>
                        <p className="text-center text-sm text-gray-500">
                            Если вы не получили письмо, проверьте папку "Спам".
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Link href="/login">
                            <Button variant="outline">
                                Вернуться ко входу
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
