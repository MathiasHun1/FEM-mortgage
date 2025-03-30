import { formatString } from '../utils';
import image from '/images/illustration-empty.svg';

const ResultSection = ({ result, total }) => {
  return (
    <>
      {!result && (
        <div className="noresult-container">
          <div className="image_wrapper-result">
            <img src={image} alt="" />
          </div>

          <h2 className="text-XL text-white">Results shown here</h2>
          <p className="text-M text-light-slate text-center">
            Complete the form and click "calculate repayments" to see what your
            monthly repayments wold be
          </p>
        </div>
      )}

      {result && (
        <div className="isresult-container">
          <h2 className="text-XL text-white">Your results</h2>
          <p className="text-M text-light-slate">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click "calculate
            repayments" again.
          </p>

          <div className="calculations-wrapper">
            <div>
              <p className="text-M text-light-slate">Your monthly repayments</p>
              <p className="text-XXL text-lime font-bold">
                {formatString(Number(result).toFixed(0))} HUF
              </p>
            </div>

            <div>
              <p className="text-M text-light-slate">
                Total you will repay over the term
              </p>
              <p className="text-XL text-white font-bold">
                {formatString(Number(total).toFixed(0))} HUF
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultSection;
