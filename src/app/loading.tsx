import LoadingSpinner from "@/components/loading-spinner";

export default async function Loading() {
  return (
    <div className="flex items-center justify-center p-10">
      <LoadingSpinner />
    </div>
  );
}
