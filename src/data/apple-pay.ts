export const OPTIONS = {
  requestPayerName: true,
  requestPayerPhone: true,
  requestPayerEmail: true,
  requestShipping: true,
};

export const METHOD_DATA = [
  {
    supportedMethods: ['apple-pay'],
    data: {
      merchantIdentifier: 'merchant.com.faisal49m.anyacht',
      supportedNetworks: ['visa', 'mastercard', 'mada'],
      countryCode: 'SA',
      currencyCode: 'SAR',
      merchantCapabilities: [ 'supports3DS' ]
    },
  },
];
