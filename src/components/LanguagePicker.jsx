import { useState } from 'react';
import { lang } from '../assets/languageData';

const LanguagePicker = ({ setLanguage }) => {
  const [current, setCurrent] = useState('HU');
  const [isHidden, setIsHidden] = useState(true);

  const styles = {
    backgroundImage: `url(http://purecatamphetamine.github.io/country-flag-icons/3x2/${current}.svg)`,
  };

  const handleClick = (e) => {
    if (e.target.dataset.id === 'hun') {
      setCurrent('HU');
      setLanguage(lang.hun);
    } else if (e.target.dataset.id === 'eng') {
      setCurrent('GB');
      setLanguage(lang.eng);
    }

    setIsHidden(!isHidden);
  };

  return (
    <div
      className="language-picker-container"
      style={styles}
      onClick={() => setIsHidden(!isHidden)}
    >
      <ul className={`${isHidden ? '' : 'visible'}`}>
        <li onClick={handleClick} data-id="hun">
          Magyar
        </li>
        <li onClick={handleClick} data-id="eng">
          English
        </li>
      </ul>
    </div>
  );
};

export default LanguagePicker;
