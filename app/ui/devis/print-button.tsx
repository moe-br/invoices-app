'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-tunisia-blue text-white px-6 py-2 rounded-lg font-bold hover:bg-tunisia-red transition-all shadow-lg"
    >
      Print Invoice
    </button>
  );
}
