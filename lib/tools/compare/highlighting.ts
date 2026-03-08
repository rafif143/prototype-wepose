// Comparison table highlighting logic

import { VisaData } from './types';

export interface HighlightResult {
  bestIndices: number[];
  worstIndices: number[];
}

function parsePrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[^0-9]/g, ''));
}

function parseProcessTime(timeStr: string): number {
  const match = timeStr.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

export function calculateHighlights(
  visas: VisaData[],
  criterion: keyof VisaData
): HighlightResult {
  if (criterion === 'price') {
    // Lower is better for price
    const prices = visas.map((v) => parsePrice(v.price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return {
      bestIndices: prices
        .map((p, i) => (p === minPrice ? i : -1))
        .filter((i) => i !== -1),
      worstIndices: prices
        .map((p, i) => (p === maxPrice ? i : -1))
        .filter((i) => i !== -1),
    };
  }

  if (criterion === 'processTime') {
    // Lower is better for process time
    const times = visas.map((v) => parseProcessTime(v.processTime));
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);

    return {
      bestIndices: times
        .map((t, i) => (t === minTime ? i : -1))
        .filter((i) => i !== -1),
      worstIndices: times
        .map((t, i) => (t === maxTime ? i : -1))
        .filter((i) => i !== -1),
    };
  }

  // For other criteria, no highlighting
  return { bestIndices: [], worstIndices: [] };
}
