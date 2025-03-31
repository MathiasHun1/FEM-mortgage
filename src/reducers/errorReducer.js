export const initialErrorState = {
  amountError: false,
  termError: false,
  rateError: false,
  typeError: false,
};

export const errorReducer = (state, action) => {
  switch (action.type) {
    case 'setAmountError': {
      return { ...state, amountError: action.payload };
    }
    case 'setTermError': {
      return { ...state, termError: action.payload };
    }
    case 'setRateError': {
      return { ...state, rateError: action.payload };
    }
    case 'setTypeError': {
      return { ...state, typeError: action.payload };
    }
    case 'clearAll': {
      const stateCopy = { ...state };

      for (let key in stateCopy) {
        stateCopy[key] = false;
      }
      return stateCopy;
    }
    default:
      throw new Error(`unknown action type: ${action.type}`);
  }
};
