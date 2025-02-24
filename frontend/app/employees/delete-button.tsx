"use client";

import { deleteUser } from "@/api";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeleteButton({ id }: { id: number }) {
    return (
        <Button
            variant="outline"
            size="icon"
            onClick={async () => {
                await deleteUser(id);
                window.location.reload();
            }}
        >
            <TrashIcon />
        </Button>
    );
}
