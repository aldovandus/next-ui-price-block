import "../index.css";
import { Badge } from "@/components/ui/badge";
//import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DynamicPriceBlock from "./DynamicPriceBlock";
import { PriceBlock } from "@/types/price-block";
import { useState } from "react";
import { usePriceBlockStore } from "../zustand/price-block-store";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

const enviroments = [
  {
    id: 1,
    country: "Italy",
    env: "staging",
    url: "https://staging.dacnl39nyabtl.amplifyapp.com"
  },
  {
    id: 2,
    country: "Italy",
    env: "prod",
    url: "https://environments-it.dacnl39nyabtl.amplifyapp.com"
  }
];

//const url = "https://staging.dacnl39nyabtl.amplifyapp.com/api/price-block/get-price-blocks";

const getPriceBlocks = async (url: string) => {
  try {
    const data = await fetch(`${url}/api/price-block/get-price-blocks`);
    const { result } = await data.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export function Dashboard() {
  const [priceBlocks, setPriceBlocks] = useState<PriceBlock[]>([]);
  const [currentEnv, setCurrentEnv] = useState(0);
  const [currentPriceBlockIndex, setCurrentPriceBlockIndex] = useState(0);

  const gridSize = usePriceBlockStore((state) => state.gridSize);
  const numRows = usePriceBlockStore((state) => state.numRows);
  const numCols = usePriceBlockStore((state) => state.numCols);
  const isLoading = usePriceBlockStore((state) => state.isLoading);

  /* useEffect(() => {
    usePriceBlockStore.getState().setLoading(true);

    getPriceBlocks()
      .then((res) => setPriceBlocks(res))
      .finally(() => {
        usePriceBlockStore.getState().setLoading(false);
      });
  }, []); */

  const example = {
    textCustom1: "testo 1",
    textCustom2: "testo 2",
    textCustom10: "testo 3"
  };

  const customFields = Object.entries(example)
    .filter(([key]) => key.startsWith("textCustom"))
    .map(([key, value]) => {
      const customFieldKey = `customfield_${key.replace("textCustom", "")}`;
      return { id: customFieldKey, value };
    });

  console.log({ customFields });

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
                      console.error({ e });
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
                  <Label htmlFor="model">Choose Env</Label>
                  <Select
                    disabled={isLoading}
                    onValueChange={(e) => {
                      setCurrentEnv(parseInt(e));
                    }}
                  >
                    <SelectTrigger id="model" className="items-start [&_[data-description]]:hidden">
                      <SelectValue placeholder="Select a Price Block" />
                    </SelectTrigger>
                    <SelectContent>
                      {enviroments.map((enviroment, index) => (
                        <SelectItem value={index.toString()}>
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <div className="grid gap-0.5">
                              {/* <p>
                                Neural <span className="font-medium text-foreground">Genesis</span>
                              </p> */}
                              <p>
                                <span className="font-medium text-foreground">{enviroment.country}</span>
                              </p>
                              <p className="text-xs" data-description>
                                {enviroment.env}.
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

                  <div>
                    <Button
                      onClick={async (e) => {
                        e.preventDefault();
                        usePriceBlockStore.getState().setLoading(true);
                        const res = await getPriceBlocks(enviroments[currentEnv]?.url);

                        setPriceBlocks(res);

                        usePriceBlockStore.getState().setLoading(false);
                      }}
                      type="submit"
                      className=""
                    >
                      load env
                    </Button>
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
                    elementKey="test_price_block"
                    key={currentPriceBlockIndex}
                    priceBlockJson={priceBlocks[currentPriceBlockIndex].jsonConf}
                    gridSize={10}
                    fullPriceValue="100.40"
                    discount="30%"
                    discountedValue="44,90"
                    fontsUrl={priceBlocks[currentPriceBlockIndex].jsonConf.settings.fontsUrl}
                    textCustom={customFields}
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
