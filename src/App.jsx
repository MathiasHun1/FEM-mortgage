import { useReducer } from 'react';
import './App.scss';
import calcSVG from '/images/icon-calculator.svg';
import {
  calculateRepay,
  parseInput,
  normalizeString,
  formatString,
} from './utils';

import ResultSection from './components/ResultSection';
import TextInput from './components/TextInput';

const initialState = {
  amount: '',
  term: '',
  rate: '',
  method: '',
  result: '',
  total: '',
};

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'amount': {
      return parseInput(state, action, 'amount');
    }
    case 'term': {
      return action.payload.length > 3
        ? state
        : parseInput(state, action, 'term');
    }
    case 'rate': {
      return parseInput(state, action, 'rate');
    }
    case 'method': {
      return { ...state, method: action.payload };
    }

    case 'setResult': {
      return { ...state, result: action.payload };
    }
    case 'setTotal': {
      return { ...state, total: action.payload };
    }

    case 'clearAll': {
      return { ...initialState };
    }
    default:
      throw new Error(`unknown action: ${action.type}`);
  }
};

function App() {
  const [state, dispatch] = useReducer(inputReducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!(state.amount && state.term && state.rate)) {
      throw new Error('Missing input');
    }

    const amount = Number(state.amount);
    const term = Number(state.term);
    const rate = Number(state.rate);

    if (!(amount > 0) && !(term > 0) && !(rate > 0)) {
      throw new Error('Invalid input value');
    }

    if (state.method === 'repayment') {
      const result = calculateRepay(amount, term, rate);
      const total = result * term * 12;
      dispatch({ type: 'setResult', payload: result.toString() });
      dispatch({ type: 'setTotal', payload: total.toString() });
    }
  };

  return (
    <div className="app">
      <main className="card">
        <div className="form-section">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h1 className="text-XL font-bold">Mortgage Calculator</h1>
              <button
                type="button"
                className="clear-button text-medium-slate"
                onClick={() => dispatch({ type: 'clearAll' })}
              >
                Clear all
              </button>
            </div>

            <div className="input-block">
              <label className="label-basic" htmlFor="amount">
                Mortgage Amount
              </label>
              <TextInput
                id="amount"
                value={state.amount}
                onChange={(e) =>
                  dispatch({
                    type: 'amount',
                    payload: normalizeString(e.target.value),
                  })
                }
                decoration="$"
                decorSide="left"
              />
            </div>

            <div className="input-flex-wrapper">
              <div className="input-block">
                <label className="label-basic" htmlFor="term">
                  Mortgage Term
                </label>
                <TextInput
                  id="term"
                  value={state.term}
                  onChange={(e) =>
                    dispatch({
                      type: 'term',
                      payload: e.target.value,
                    })
                  }
                  decoration="years"
                  decorSide={'right'}
                />
              </div>
              <div className="input-block">
                <label className="label-basic" htmlFor="rate">
                  Mortgage Rate
                </label>
                <TextInput
                  id="rate"
                  value={state.rate}
                  onChange={(e) =>
                    dispatch({
                      type: 'rate',
                      payload: e.target.value,
                    })
                  }
                  decoration="%"
                  decorSide="right"
                />
                {/* <div className="input-wrapper input-design">
                  <input
                    className=""
                    type="text"
                    id="rate"
                    value={state.rate}
                    onChange={(e) =>
                      dispatch({
                        type: 'rate',
                        payload: e.target.value,
                      })
                    }
                  />
                  <p className="input-decor text-medium-slate font-bold">%</p>
                </div> */}
              </div>
            </div>

            <div className="radio-input-block">
              <label className="label-basic" htmlFor="type">
                Mortgage Type
              </label>

              <div className="radio-input-wrapper input-design">
                <input
                  type="radio"
                  name="type"
                  id=""
                  value="repayment"
                  checked={state.method === 'repayment'}
                  onChange={(e) =>
                    dispatch({ type: 'method', payload: e.target.value })
                  }
                />
                <label className="label-stressed" htmlFor="">
                  Repayment
                </label>
              </div>

              <div className="radio-input-wrapper input-design">
                <input
                  type="radio"
                  name="type"
                  id=""
                  value="interest"
                  checked={state.method === 'interest'}
                  onChange={(e) =>
                    dispatch({ type: 'method', payload: e.target.value })
                  }
                />
                <label className="label-stressed" htmlFor="">
                  Interest Only
                </label>
              </div>
            </div>

            <button
              className="submit-button text-dark-slate font-bold"
              type="submit"
            >
              <img src={calcSVG} alt="" />
              Calculate Repayments
            </button>
          </form>
        </div>

        <div className="result-section">
          <ResultSection result={state.result} total={state.total} />
        </div>
      </main>
    </div>
  );
}

export default App;
