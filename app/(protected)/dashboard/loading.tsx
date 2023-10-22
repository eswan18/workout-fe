import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // for some reason I don't think this NextJS is actually using this for the loading state.
  return (
    <Skeleton className="h-12 w-12 rounded-full">
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
    </Skeleton>
  )
}