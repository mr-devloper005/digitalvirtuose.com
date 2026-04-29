"use client";

import { useState } from "react";
import { ContentImage } from "@/components/shared/content-image";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function DirectoryPhotoGallery({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!images.length) return null;

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.07)]">
        <button
          type="button"
          onClick={() => setActiveIndex(0)}
          className="relative block h-[420px] w-full overflow-hidden bg-slate-100 sm:h-[500px]"
          aria-label={`Open ${title} image`}
        >
          <ContentImage src={images[0]} alt={title} fill className="object-contain p-8" />
        </button>
        {images.length > 1 ? (
          <div className="grid grid-cols-4 gap-3 p-4">
            {images.slice(1, 5).map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveIndex(index + 1)}
                className="relative h-24 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                aria-label={`Open ${title} image ${index + 2}`}
              >
                <ContentImage src={image} alt={`${title} image ${index + 2}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <DialogContent className="max-w-[95vw] border-slate-800 bg-slate-950 p-2 sm:max-w-5xl" showCloseButton>
          <DialogTitle className="sr-only">{title} image preview</DialogTitle>
          <DialogDescription className="sr-only">Preview image in a popup. Use close button to exit.</DialogDescription>
          {activeIndex !== null ? (
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-slate-900">
              <ContentImage
                src={images[activeIndex]}
                alt={`${title} enlarged image ${activeIndex + 1}`}
                fill
                className="object-contain"
                intrinsicWidth={1600}
                intrinsicHeight={1000}
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
