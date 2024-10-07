import { Button } from "@/components/ui/button";
import { CheckInDay } from "./_components/check-in-day";
import { SummaryTable } from "./_components/summary-table";

export default function Page(): JSX.Element {
  return (
    <main className="h-screen w-screen flex flex-col items-center p-2">
      <header className="w-full h-10">
      </header>

      <div className="w-full h-full ">
        <h1 className="font-bold text-xl">
          Sua sequencia de dias: 
        </h1>

        <SummaryTable />
        
      </div>

      <Button className="w-full" size="lg">
        Fazer check-in
      </Button>

    </main>
  );
}
