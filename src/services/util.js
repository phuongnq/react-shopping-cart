export const formatPrice = (x, currency) => {
  switch (currency) {
    case 'BRL':
      return x.toFixed(2).replace('.', ',');
    default:
      return x.toFixed(2);
  }
};

export const getCookie = (cName) => {
  const name = cName + '=';
  const cDecoded = decodeURIComponent(document.cookie);
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach(val => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  })
  return res
};

export const productsAPI = `http://localhost:8080/api/1/services/products.json?crafterSite=${getCookie('crafterSite')}`;
