// Exchange rate (1 USD to INR)
const EXCHANGE_RATE = 83.0;

export const convertToINR = (usdPrice) => {
  const inrPrice = usdPrice * EXCHANGE_RATE;
  return Math.round(inrPrice);
};

export const formatPrice = (price, currency = 'INR') => {
  if (currency === 'INR') {
    return `₹${price.toLocaleString('en-IN')}`;
  }
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const calculateDiscount = (originalPrice, currentPrice) => {
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
  return Math.round(discount);
}; 