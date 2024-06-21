import { Badge } from "@/components/ui/badge";
//import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DynamicPriceBlock from "./DynamicPriceBlock";
import { PriceBlock } from "@/types/price-block";
import { useState, useEffect } from "react";
import { usePriceBlockStore } from "@/zustand/price-block-store";
import { Skeleton } from "./ui/skeleton";

const url = "https://staging.dacnl39nyabtl.amplifyapp.com/api/price-block/get-price-blocks";

const getPriceBlocks = async () => {
  try {
    const data = await fetch(url);
    const { result } = await data.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export function Dashboard() {
  const [priceBlocks, setPriceBlocks] = useState<PriceBlock[]>([]);

  const [currentPriceBlockIndex, setCurrentPriceBlockIndex] = useState(0);

  const gridSize = usePriceBlockStore((state) => state.gridSize);
  const numRows = usePriceBlockStore((state) => state.numRows);
  const numCols = usePriceBlockStore((state) => state.numCols);
  const isLoading = usePriceBlockStore((state) => state.isLoading);

  useEffect(() => {
    usePriceBlockStore.getState().setLoading(true);

    getPriceBlocks()
      .then((res) => setPriceBlocks(res))
      .finally(() => {
        usePriceBlockStore.getState().setLoading(false);
      });
  }, []);

  return (
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r"></aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">PriceBlocks</h1>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0">
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
                <div className="grid gap-3">
                  <Label htmlFor="model">Current PriceBlock</Label>
                  <Select
                    disabled={isLoading}
                    onValueChange={(e) => {
                      console.log({ e });
                      setCurrentPriceBlockIndex(parseInt(e));
                    }}
                  >
                    <SelectTrigger id="model" className="items-start [&_[data-description]]:hidden">
                      <SelectValue placeholder="Select a Price Block" />
                    </SelectTrigger>
                    <SelectContent>
                      {priceBlocks.map((priceBlock, index) => (
                        <SelectItem value={index.toString()}>
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <div className="grid gap-0.5">
                              {/* <p>
                                Neural <span className="font-medium text-foreground">Genesis</span>
                              </p> */}
                              <p>
                                <span className="font-medium text-foreground">{priceBlock.name}</span>
                              </p>
                              <p className="text-xs" data-description>
                                {priceBlock._id}.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="temperature">Grid</Label>
                  <Input
                    onChange={(e) => {
                      usePriceBlockStore.getState().setGridSize(parseInt(e.target.value));
                    }}
                    id="temperature"
                    defaultValue={18}
                    value={gridSize}
                    type="number"
                    placeholder="18"
                    min={1}
                    max={50}
                    disabled={isLoading}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="top-p">Num Cols</Label>
                    <Input
                      value={numCols}
                      defaultValue={usePriceBlockStore.getState().numCols}
                      onChange={(e) => {
                        usePriceBlockStore.getState().setNumCols(parseInt(e.target.value));
                      }}
                      id="top-p"
                      type="number"
                      placeholder="0.7"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-k">Num Rows</Label>
                    <Input
                      value={numRows}
                      defaultValue={numRows}
                      onChange={(e) => {
                        usePriceBlockStore.getState().setNumRows(parseInt(e.target.value));
                      }}
                      id="top-k"
                      type="number"
                      placeholder="0.0"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-3 top-3">
              Output
            </Badge>
            <div className="flex-1">
              {isLoading ? (
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ) : (
                priceBlocks.length > 0 && (
                  <DynamicPriceBlock
                    key={currentPriceBlockIndex}
                    priceBlockJson={priceBlocks[currentPriceBlockIndex].jsonConf}
                    gridSize={10}
                    fullPriceValue="100.40"
                    discount="30%"
                    discountedValue="44,90"
                    fontsUrl={priceBlocks[currentPriceBlockIndex].jsonConf.settings.fontsUrl}
                  />
                )
              )}
            </div>

            <form
              className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
              x-chunk="dashboard-03-chunk-1"
            >
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
