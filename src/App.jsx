import { useReducer, useState } from 'react';
import './App.scss';
import { lang } from './assets/languageData';
import { inputReducer, initialState } from './reducers/inputreducer';

import ResultSection from './components/ResultSection';
import LanguagePicker from './components/LanguagePicker';
import FormSection from './components/FormSection';

function App() {
  const [language, setLanguage] = useState(lang.hun);
  const [state, dispatch] = useReducer(inputReducer, initialState);

  return (
    <div className="app">
      <main className="card">
        <FormSection state={state} dispatch={dispatch} language={language} />

        <ResultSection
          result={state.result}
          total={state.total}
          language={language}
        />

        <LanguagePicker setLanguage={setLanguage} />
      </main>
    </div>
  );
}

export default App;
