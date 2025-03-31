import { useReducer, useState } from 'react';
import './App.scss';
import calcSVG from '/images/icon-calculator.svg';
import {
  calculateRepay,
  calculateInterest,
  parseInput,
  normalizeString,
} from './utils';
import { lang } from './assets/languageData';

import ResultSection from './components/ResultSection';
import TextInput from './components/TextInput';
import LanguagePicker from './components/LanguagePicker';

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
  const [language, setLanguage] = useState(lang.eng);
  const [state, dispatch] = useReducer(inputReducer, initialState);
  const [amountError, setAmountError] = useState(false);
  const [termError, setTermError] = useState(false);
  const [rateError, setRateError] = useState(false);
  const [typeError, setTypeError] = useState(false);

  const validate = (state) => {
    setAmountError(false);
    setTermError(false);
    setRateError(false);
    setTypeError(false);

    if (!state.amount) {
      setAmountError(true);
    }
    if (!state.term) {
      setTermError(true);
    }
    if (!state.rate) {
      setRateError(true);
    }
    if (!(state.method === 'repayment' || state.method === 'interest')) {
      setTypeError(true);
    }

    if (!(state.amount && state.term && state.rate && state.method)) {
      throw new Error('Missing input');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validate(state);

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

    if (state.method === 'interest') {
      const result = calculateInterest(amount, rate);
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
              <h1 className="text-XL font-bold">{language.titles.main}</h1>
              <button
                type="button"
                className="clear-button text-medium-slate"
                onClick={() => dispatch({ type: 'clearAll' })}
              >
                {language.button.clear}
              </button>
            </div>

            <div className="input-block">
              <label className="label-basic" htmlFor="amount">
                {language.labels.amountInput}
              </label>
              <TextInput
                id="amount"
                value={state.amount}
                onChange={(e) => {
                  dispatch({
                    type: 'amount',
                    payload: normalizeString(e.target.value),
                  });
                  setAmountError(false);
                }}
                decoration={language.meta.amountInput}
                decorSide="left"
                errorState={amountError}
              />
            </div>

            <div className="input-flex-wrapper">
              <div className="input-block">
                <label className="label-basic" htmlFor="term">
                  {language.labels.termInput}
                </label>
                <TextInput
                  id="term"
                  value={state.term}
                  onChange={(e) => {
                    dispatch({
                      type: 'term',
                      payload: e.target.value,
                    });
                    setTermError(false);
                  }}
                  decoration={language.meta.termInput}
                  decorSide={'right'}
                  errorState={termError}
                />
              </div>
              <div className="input-block">
                <label className="label-basic" htmlFor="rate">
                  {language.labels.rateInput}
                </label>
                <TextInput
                  id="rate"
                  value={state.rate}
                  onChange={(e) => {
                    dispatch({
                      type: 'rate',
                      payload: e.target.value,
                    });
                    setRateError(false);
                  }}
                  decoration="%"
                  decorSide="right"
                  errorState={rateError}
                />
              </div>
            </div>

            <div className="radio-input-block">
              <label className="label-basic" htmlFor="type">
                {language.meta.typeInput}
              </label>

              <div
                className="repayment-input-wrapper radio-input-wrapper bordered"
                onClick={() =>
                  dispatch({ type: 'method', payload: 'repayment' })
                }
              >
                <input
                  className="repayment-input"
                  type="radio"
                  name="type"
                  id=""
                  value="repayment"
                  checked={state.method === 'repayment'}
                  onChange={() =>
                    dispatch({ type: 'method', payload: 'repayment' })
                  }
                />
                <label className="label-stressed" htmlFor="">
                  {language.labels.repaymentInput}
                </label>
              </div>

              <div
                className="interest-input-wrapper radio-input-wrapper bordered"
                onClick={() =>
                  dispatch({ type: 'method', payload: 'interest' })
                }
              >
                <input
                  className="interest-input"
                  type="radio"
                  name="type"
                  id=""
                  value="interest"
                  checked={state.method === 'interest'}
                  onChange={() =>
                    dispatch({ type: 'method', payload: 'interest' })
                  }
                />
                <label className="label-stressed" htmlFor="">
                  {language.labels.interestInput}
                </label>
              </div>
              <p
                className={`error-message text-red text-S ${
                  !typeError ? 'hidden' : ''
                }`}
              >
                {language.errorMessage}
              </p>
            </div>

            <button
              className="submit-button text-dark-slate font-bold"
              type="submit"
            >
              <img src={calcSVG} alt="" />
              {language.button.subimt}
            </button>
          </form>
        </div>

        <div className="result-section">
          <ResultSection
            result={state.result}
            total={state.total}
            language={language}
          />
        </div>
        <LanguagePicker setLanguage={setLanguage} />
      </main>
    </div>
  );
}

export default App;
