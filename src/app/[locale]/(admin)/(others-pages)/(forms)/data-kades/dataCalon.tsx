import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export function CardImage() {
  return (
    <Card className="relative my-5 w-full max-w-xs border-2 border-blue-700 bg-white p-3 shadow-xl transition duration-300 hover:scale-105 dark:border-white dark:bg-blue-700">
      <div className="mt-3 font-bold text-blue-950 dark:text-white">
        <span className="rounded-lg bg-blue-400 p-3 dark:bg-green-700">01</span>
      </div>
      <div className="flex">
        <div>
          <Image
            src="/uploads/calon/me.JPG"
            alt="Event cover"
            className="border-2 border-red-600"
            width={100}
            height={100}
          />
        </div>
        <CardHeader className="w-full pt-0 text-blue-950 dark:text-white">
          <CardTitle className="rounded-lg bg-blue-400 p-1 dark:bg-green-700">
            MOH. DIAUUDIN MAULIDI
          </CardTitle>
          <CardTitle>Perolehan Suara</CardTitle>
          <CardDescription className="text-4xl font-semibold">
            500 <span className="text-2xl font-normal">Suara</span>
          </CardDescription>
        </CardHeader>
      </div>
    </Card>
  );
}
