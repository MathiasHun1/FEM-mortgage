import { useReducer } from 'react';
import { normalizeString, calculateRepay, calculateInterest } from '../utils';
import { errorReducer, initialErrorState } from '../reducers/errorReducer';
import calcSVG from '/images/icon-calculator.svg';

import TextInput from './TextInput';

const FormSection = ({ state, dispatch, language }) => {
  const [errorState, errorDispatch] = useReducer(
    errorReducer,
    initialErrorState
  );

  const validate = (state) => {
    errorDispatch({ type: 'clearAll' });

    if (!state.amount) {
      dispatch({ type: 'amountError', payload: false });
    }
    if (!state.term) {
      dispatch({ type: 'termError', payload: false });
    }
    if (!state.rate) {
      dispatch({ type: 'rateError', payload: false });
    }
    if (!(state.method === 'repayment' || state.method === 'interest')) {
      dispatch({ type: 'typeError', payload: false });
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
              errorDispatch({ type: 'setAmountError', payload: false });
            }}
            decoration={language.meta.amountInput}
            decorSide="left"
            errorState={errorState.amountError}
            language={language}
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
                errorDispatch({
                  type: 'setTermError',
                  payload: false,
                });
              }}
              decoration={language.meta.termInput}
              decorSide={'right'}
              errorState={errorState.termError}
              language={language}
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
                errorDispatch({
                  type: 'setRateError',
                  payload: false,
                });
              }}
              decoration="%"
              decorSide="right"
              errorState={errorState.rateError}
              language={language}
            />
          </div>
        </div>

        <div className="radio-input-block">
          <label className="label-basic" htmlFor="">
            {language.meta.typeInput}
          </label>

          <div
            className="repayment-input-wrapper radio-input-wrapper bordered"
            onClick={() => {
              dispatch({ type: 'method', payload: 'repayment' });
              errorDispatch({
                type: 'setTypeError',
                payload: false,
              });
            }}
          >
            <input
              className="repayment-input"
              type="radio"
              name="type"
              id="repayment"
              value="repayment"
              checked={state.method === 'repayment'}
              onChange={() =>
                dispatch({ type: 'method', payload: 'repayment' })
              }
            />
            <label className="label-stressed" htmlFor="repayment">
              {language.labels.repaymentInput}
            </label>
          </div>

          <div
            className="interest-input-wrapper radio-input-wrapper bordered"
            onClick={() => {
              dispatch({ type: 'method', payload: 'interest' });
              errorDispatch({
                type: 'setTypeError',
                payload: false,
              });
            }}
          >
            <input
              className="interest-input"
              type="radio"
              name="type"
              id="interest"
              value="interest"
              checked={state.method === 'interest'}
              onChange={() => dispatch({ type: 'method', payload: 'interest' })}
            />
            <label className="label-stressed" htmlFor="interest">
              {language.labels.interestInput}
            </label>
          </div>
          <p
            className={`error-message text-red text-S ${
              !errorState.typeError ? 'hidden' : ''
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
  );
};

export default FormSection;
