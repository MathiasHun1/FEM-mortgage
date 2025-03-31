import { useEffect, useRef, useState } from 'react';
import { formatString } from '../utils';

const TextInput = ({
  id,
  value,
  onChange,
  decoration,
  decorSide,
  errorState,
}) => {
  const inputRef = useRef(null);
  const decorRef = useRef(null);
  const [inputHeight, setInputHeight] = useState(null);
  const [decorWidth, setDecorWidth] = useState(null);

  const decorSytle = {
    height: `calc(${inputHeight}px)`,
    [decorSide]: '0',
    top: '0',
    borderTopLeftRadius: decorSide === 'left' ? '4px' : '',
    borderBottomLeftRadius: decorSide === 'left' ? '4px' : '',
    borderTopRightRadius: decorSide === 'left' ? '' : '4px',
    borderBottomRightRadius: decorSide === 'left' ? '' : '4px',
  };

  let inputStyle;
  if (decorSide === 'left') {
    inputStyle = { paddingLeft: `calc(${decorWidth}px + 1rem)` };
  }
  if (decorSide === 'right') {
    inputStyle = { paddingRight: `calc(${decorWidth}px + 1rem)` };
  }

  useEffect(() => {
    if (inputRef.current) {
      const DOMNode = inputRef.current;
      setInputHeight(DOMNode.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (inputHeight && decorRef.current) {
      const DOMNode = decorRef.current;
      setDecorWidth(DOMNode.offsetWidth);
    }
  }, [inputHeight]);

  return (
    <>
      <div className="input-wrapper">
        <p
          ref={decorRef}
          className={`input-decor text-medium-slate font-bold ${
            errorState ? 'error' : ''
          }`}
          style={decorSytle}
        >
          {decoration}
        </p>
        <input
          ref={inputRef}
          className={`bordered ${errorState ? 'error' : ''}`}
          type="text"
          id={id}
          value={formatString(value)}
          onChange={onChange}
          style={inputStyle}
        />
      </div>
      <p
        className={`error-message text-red text-S ${
          !errorState ? 'hidden' : ''
        }`}
      >
        This field is required
      </p>
    </>
  );
};

export default TextInput;
