import { Revenue } from './definitions';

export const formatCurrency = (amount: number) => {
  return (amount / 1000).toLocaleString('fr-TN', {
    style: 'currency',
    currency: 'TND',
    minimumFractionDigits: 3,
  });
};

// Use when the value is already in TND (not millimes), e.g. in live form previews
export const formatTND = (amount: number) => {
  return amount.toLocaleString('fr-TN', {
    style: 'currency',
    currency: 'TND',
    minimumFractionDigits: 3,
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  const yAxisLabels = [];
  const highestRecord = revenue.length > 0 
    ? Math.max(...revenue.map((month) => month.revenue))
    : 0;
  
  // Default to 5000 if no data, to show some structure
  const topLabel = highestRecord > 0 
    ? Math.ceil(highestRecord / 1000) * 1000
    : 5000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(i === 0 ? '0' : `${i / 1000}K DT`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
