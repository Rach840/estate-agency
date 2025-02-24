"use server";

export async function getOverview(): Promise<{
    totalUsers: number;
    totalObjects: number;
    totalSalary:number;
}> {
    const res = await fetch(`${process.env.API_URL}/overview`);
    return await res.json();
}
