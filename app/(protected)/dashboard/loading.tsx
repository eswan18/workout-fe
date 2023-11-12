import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col justify-start gap-10 p-10 lg:p-16">
      <div className="mb-4">
        <h1 className="text-4xl">Your Dashboard</h1>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[75%]" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[75%]" />
        <Skeleton className="h-4 w-full" />
      </div>
    </main>
  );
}
