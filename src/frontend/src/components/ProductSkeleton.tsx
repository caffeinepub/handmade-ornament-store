import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <div
      className="flex flex-col border border-gold-line"
      style={{ backgroundColor: "#0f0f0f" }}
    >
      <Skeleton
        className="aspect-square w-full"
        style={{ backgroundColor: "oklch(0.13 0 0)" }}
      />
      <div className="p-4 space-y-2">
        <Skeleton
          className="h-3 w-16"
          style={{ backgroundColor: "oklch(0.13 0 0)" }}
        />
        <Skeleton
          className="h-4 w-3/4"
          style={{ backgroundColor: "oklch(0.13 0 0)" }}
        />
        <div className="flex justify-between pt-2">
          <Skeleton
            className="h-4 w-16"
            style={{ backgroundColor: "oklch(0.13 0 0)" }}
          />
          <Skeleton
            className="h-8 w-28"
            style={{ backgroundColor: "oklch(0.13 0 0)" }}
          />
        </div>
      </div>
    </div>
  );
}
