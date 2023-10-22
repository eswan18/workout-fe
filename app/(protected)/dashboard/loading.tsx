import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col justify-start gap-10 p-10 lg:p-16">
      <div className="mb-4">
        <h1 className="text-2xl lg:text-4xl">Welcome!</h1>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-muted-foreground" />
        <Skeleton className="h-4 w-[200px] bg-muted-foreground" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-muted-foreground" />
        <Skeleton className="h-4 w-[200px] bg-muted-foreground" />
      </div>
    </main>
  );
}
