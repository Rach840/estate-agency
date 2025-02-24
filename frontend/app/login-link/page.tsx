import { checkLink } from "@/api/auth";
import { Login } from "./login";

export default async function LoginLink({
    searchParams,
}: {
    searchParams: Promise<{ link: string }>;
}) {
    const params = await searchParams;
    const user = await checkLink(params.link);

    return (
        <>
            <Login user={user} />
        </>
    );
}
