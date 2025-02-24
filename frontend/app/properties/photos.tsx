"use client";

import { File } from "@/models";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function Photos({ photosRaw }: { photosRaw: File[] }) {
    const photos = photosRaw.map((photo) =>
        URL.createObjectURL(
            new Blob([Buffer.from(photo.data)], {
                type: photo.mime,
            }),
        ),
    );
    return (
        <Carousel className={"mx-auto max-w-sm"}>
            <CarouselContent>
                {photos.map((photo, index) => (
                    <CarouselItem key={index}>
                        <div
                            className={
                                "flex aspect-square items-center justify-center"
                            }
                        >
                            <Image
                                src={photo}
                                alt={"Property photo"}
                                width={600}
                                height={400}
                                className="rounded-md object-cover"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
export function getPhotoUrl(photosRaw) {
    console.log()
    const photos = photosRaw.map((photo) =>
        URL.createObjectURL(
            new Blob([Buffer.from(photo.data)], {
                type: photo.mime,
            }),
        ),
    );
    return photos[0] ;
}
