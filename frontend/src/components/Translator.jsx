import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

// Accept 'translations' as a prop
function Translator({ translations }) {
  const [translationInput, setTranslationInput] = useState('');
  const [translationResult, setTranslationResult] = useState('');
  const [error, setError] = useState(null);

  const handleTranslate = async (e) => {
    e.preventDefault();
    setError(null);
    setTranslationResult('');
    
    try {
      const response = await axios.post(`${API_URL}/translate`, { // This endpoint is generic
        text: translationInput
      });
      setTranslationResult(response.data.translation);
    } catch (err) {
      // Use the translated error prefix from props
      setError(translations.translatorErrorPrefix + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div>
      <style>
        {`
          .translator-container {
            margin-bottom: 2rem;
            width: 100%;
            max-width: 768px;
            margin-left: auto;
            margin-right: auto;
          }
          .translator-heading {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: 'white';
          }
          .translator-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .translator-textarea {
            border: 2px solid #d1d5db;
            padding: 1rem;
            border-radius: 0.5rem;
            height: 8rem;
            resize: none;
            font-size: 1.125rem;
            background-color: #ffffff;
            color: #000000; 
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            outline: none;
          }
          .translator-textarea:focus {
            border-color: #3b82f6;
          }
          .translator-button {
            background-color: #3b82f6;
            color: #ffffff;
            padding: 0.75rem;
            border-radius: 0.5rem;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .translator-button:hover {
            background-color: #2563eb;
          }
          .translator-result {
            padding: 1rem;
            background-color: #f9fafb; /* Slightly different bg for result */
            border: 2px solid #d1d5db;
            border-radius: 0.5rem;
            min-height: 8rem;
            font-size: 1.125rem;
            color: #000000;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: flex-start;
            text-align: left;
            white-space: pre-wrap; /* To respect newlines in translation result */
          }
          .translator-error {
            color: #ef4444;
            margin-top: 0.5rem;
            font-size: 1.125rem;
          }
        `}
      </style>
      <div className="translator-container">
        {/* Use translated heading */}
        <h2 className="translator-heading">{translations.translatorHeadingBaEn}</h2>
        <div className="translator-form">
            <textarea
                value={translationInput}
                onChange={(e) => setTranslationInput(e.target.value)}
                // Use translated placeholder
                placeholder={translations.translatorPlaceholder}
                className="translator-textarea"
            />
            <button
                onClick={handleTranslate}
                className="translator-button"
            >
                {/* Use translated button text */}
                {translations.translatorButton}
            </button>
            {/* Optionally, add a label for the result area */}
            {/* <label htmlFor="translationOutput" style={{textAlign: 'left', fontWeight: '500', color:'#555'}}>{translations.translationResultLabel}</label> */}
            <div id="translationOutput" className="translator-result">
                <p>{translationResult}</p>
            </div>
          {error && <div className="translator-error">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default Translator;