import { lang } from '../assets/languageData';
import { formatString } from '../utils';
import image from '/images/illustration-empty.svg';

const ResultSection = ({ result, total, language }) => {
  return (
    <>
      {!result && (
        <div className="noresult-container">
          <div className="image_wrapper-result">
            <img src={image} alt="" />
          </div>

          <h2 className="text-XL text-white">
            {language.titles.result.noResult}
          </h2>
          <p className="text-M text-light-slate text-center">
            {language.descriptions.noResult}
          </p>
        </div>
      )}

      {result && (
        <div className="isresult-container">
          <h2 className="text-XL text-white">
            {language.titles.result.hasResult}
          </h2>
          <p className="text-M text-light-slate">
            {language.descriptions.hasResult}
          </p>

          <div className="calculations-wrapper">
            <div>
              <p className="text-M text-light-slate">
                {language.subTitles.resultMonthly}
              </p>
              <p className="text-XXL text-lime font-bold">
                {language.name === 'eng' && '$ '}
                {formatString(Number(result).toFixed(0))}
                {language.name === 'hun' && ' HUF'}
              </p>
            </div>

            <div>
              <p className="text-M text-light-slate">
                {language.subTitles.resultTotal}
              </p>
              <p className="text-XL text-white font-bold">
                {language.name === 'eng' && '$ '}
                {formatString(Number(total).toFixed(0))}
                {language.name === 'hun' && ' HUF'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultSection;
