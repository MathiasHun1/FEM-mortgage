export const parseInput = (state, action, actionType) => {
  const regex = /^[1-9][0-9]*(\.[0-9]*)?$|^0\.[0-9]*$|^$/;

  if (regex.test(action.payload)) {
    return { ...state, [actionType]: action.payload };
  } else {
    return state;
  }
};

export const calculateRepay = (amount, years, rateInput) => {
  let m; //monthly payemnt
  const p = amount; //loan amount
  const r = rateInput / 100 / 12; // monthly rate %
  const n = years * 12; // total months

  m = p * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  return m;
};
0;

export const normalizeString = (value) => {
  return value.replace(/,/g, '');
};

export const formatString = (value) => {
  return value === '' ? '' : Number(value).toLocaleString();
};
