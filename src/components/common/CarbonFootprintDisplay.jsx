import { useCarbonFootprint } from 'react-carbon-footprint';

export default function CarbonFootprintDisplay() {
  const [gCO2, bytesTransferred] = useCarbonFootprint();

  return (
    <details className="fixed bottom-3 right-3 z-50 max-w-[calc(100vw-1.5rem)] rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-800 shadow-lg">
      <summary className="cursor-pointer font-semibold">Network carbon estimate</summary>
      <div className="mt-3 max-w-72 space-y-2">
        <p>Observed transfer: {(bytesTransferred / 1024 / 1024).toFixed(3)} MiB</p>
        <p>Estimated emissions: {gCO2.toFixed(6)} g CO₂</p>
        <p className="text-xs text-gray-500">Browser resource estimate, not measured electricity use. Cached or restricted external resources may report zero bytes. Reload to start a new page measurement.</p>
      </div>
    </details>
  );
}
