import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DynamicPriceBlock from "./components/DynamicPriceBlock";
import { PriceBlock } from "./types/price-block";

const url = "http://localhost:3000/api/price-block/get-price-blocks";

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

function App() {
  const [priceBlocks, setPriceBlocks] = useState<PriceBlock[]>([]);

  useEffect(() => {
    getPriceBlocks().then((res) => setPriceBlocks(res));
  }, []);

  console.log({ priceBlocks });
  if (priceBlocks.length === 0) return null;

  return (
    <div className="flex gap-4">
      <DynamicPriceBlock priceBlockJson={priceBlocks[0].jsonConf} />
      <div>PriceBlock</div>
    </div>
  );

  return <div className="text-red-300 text-6xl">ciao</div>;
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
