import { Package } from "lucide-react";

export default function NoData({
  title = "No data found !!",
  description = "Add some data to get started!",
}) {
  return (
    <div className="rounded-xl bg-white p-8 text-center shadow-sm dark:bg-zinc-900">
      <Package className="mx-auto mb-4 h-16 w-16 text-zinc-400" />
      <h2 className="mb-2 text-xl font-semibold text-zinc-900 uppercase dark:text-white">
        {title}
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}
