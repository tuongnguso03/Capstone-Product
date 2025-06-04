import { useState, useEffect } from 'react';
import axios from 'axios';

import { API_URL } from '../config'; 
import { Star } from 'lucide-react';

// Accept 'translations' as a prop for i18n
function Translator({ translations }) {
  // State for translation
  const [translationInput, setTranslationInput] = useState('');
  const [translationResult, setTranslationResult] = useState('');
  const [translationError, setTranslationError] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);

  // State for review
  const [currentRating, setCurrentRating] = useState(0);
  const [reviewError, setReviewError] = useState(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);


  const t = translations;

  useEffect(() => {
    setIsReviewSubmitted(false);
    setCurrentRating(0);
    setReviewError(null);
  }, [translationInput]);

  const handleTranslate = async (e) => {
    e.preventDefault();
    setTranslationError(null);
    setTranslationResult('');
    setIsReviewSubmitted(false); // Reset review submission status for new translation
    setCurrentRating(0);      // Reset rating for new translation
    setReviewError(null);
    setIsTranslating(true);
    
    if (!translationInput.trim()) {
        setTranslationError(t.translatorErrorPrefix + "Please enter text to translate.");
        setIsTranslating(false);
        return;
    }

    try {
      const response = await axios.post(`${API_URL}/translate`, { // This endpoint is generic
        text: translationInput
      });
      setTranslationResult(response.data.translation);
    } catch (err) {
      setTranslationError(t.translatorErrorPrefix + (err.response?.data?.detail || err.message));
    } finally {
      setIsTranslating(false);
    }
  };

  const handleStarClick = (ratingValue) => {
    setCurrentRating(ratingValue);
    setReviewError(null); // Clear previous review errors when a new rating is selected
  };

  const handleSubmitReview = async () => {
    if (currentRating === 0) {
      setReviewError(t.ratingRequiredMessage);
      return;
    }
    setReviewError(null);
    setIsSubmittingReview(true);
    try {
      // Assuming your review endpoint is /reviews/
      // The backend expects: src, tgt, rate
      await axios.post(`${API_URL}/reviews/`, { 
        src: translationInput,
        tgt: translationResult,
        rate: currentRating
      });
      setIsReviewSubmitted(true);
    } catch (err) {
      setReviewError(t.reviewErrorPrefix + (err.response?.data?.detail || err.message));
    } finally {
      setIsSubmittingReview(false);
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
            color: "white"; /* Corrected color and changed for better readability */
            text-align: center;
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
            min-height: 8rem; /* Use min-height for better adaptability */
            resize: vertical; /* Allow vertical resize */
            font-size: 1.125rem;
            background-color: #ffffff;
            color: #000000; 
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            outline: none;
          }
          .translator-textarea:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3); /* Focus ring */
          }
          .translator-button {
            background-color: #3b82f6;
            color: #ffffff;
            padding: 0.75rem
            border-radius: 0.5rem;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.3s, box-shadow 0.3s;
            font-size: 1rem; /* Consistent font size */
          }
          .translator-button:hover {
            background-color: #2563eb;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          .translator-button:disabled {
            background-color: #9ca3af;
            cursor: not-allowed;
          }
          .translator-result-container {
            margin-top: 1.5rem; /* Space above result */
          }
          .translator-result-label {
            display: block;
            text-align: left;
            font-weight: 500;
            color: "white";
            margin-bottom: 0.5rem;
            font-size: 1rem;
          }
          .translator-result {
            padding: 1rem;
            background-color: #f9fafb;
            border: 2px solid #e5e7eb; /* Slightly lighter border */
            border-radius: 0.5rem;
            min-height: 8rem;
            font-size: 1.125rem;
            color: #000000;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            text-align: left;
            white-space: pre-wrap; /* To respect newlines in translation result */
          }
          .translator-error, .review-error-message {
            color: #ef4444;
            margin-top: 0.75rem; /* Increased margin */
            font-size: 1rem; /* Adjusted font size */
            text-align: left;
          }
          .review-section {
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid #e5e7eb;
          }
          .review-heading {
            font-size: 1.125rem;
            font-weight: 600;
            color:"white";
            margin-bottom: 0.75rem;
          }
          .stars-container {
            display: flex;
            justify-content: center;
            gap: 0.25rem; /* Space between stars */
            margin-bottom: 1rem;
            cursor: pointer;
          }
          .star-icon {
            color: #e5e7eb; /* Default star color (empty) */
            transition: color 0.2s;
          }
          .star-icon.filled {
            color: #f59e0b; /* Filled star color (amber) */
          }
          .star-icon:hover {
            transform: scale(1.1); /* Slight zoom on hover */
          }
          .review-success-message {
            color: #10b981; /* Green for success */
            margin-top: 0.75rem;
            font-size: 1rem;
            font-weight: 500;
          }
        `}
      </style>
      <div className="translator-container">
        <h2 className="translator-heading">{t.translatorHeadingBaEn}</h2>
        <form className="translator-form" onSubmit={handleTranslate}>
            <textarea
                value={translationInput}
                onChange={(e) => setTranslationInput(e.target.value)}
                placeholder={t.translatorPlaceholder}
                className="translator-textarea"
                rows="4" // Added rows for better initial display
            />
            <button
                type="submit"
                className="translator-button"
                disabled={isTranslating}
            >
                {isTranslating ? "..." : t.translatorButton}
            </button>
        </form>

        {translationError && <div className="translator-error">{translationError}</div>}

        {translationResult && (
          <div className="translator-result-container">
            <div id="translationOutput" className="translator-result">
              {translationResult}
            </div>

            {!isReviewSubmitted ? (
              <div className="review-section">
                <h3 className="review-heading">{t.rateThisTranslation}</h3>
                <div className="stars-container">
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <Star
                      key={starValue}
                      size={32} // Increased star size
                      className={`star-icon ${currentRating >= starValue ? 'filled' : ''}`}
                      onClick={() => handleStarClick(starValue)}
                      onMouseEnter={(e) => e.currentTarget.classList.add('hover-effect')} // Example for more effects
                      onMouseLeave={(e) => e.currentTarget.classList.remove('hover-effect')}
                    />
                  ))}
                </div>
                <button 
                  onClick={handleSubmitReview} 
                  className="translator-button"
                  disabled={isSubmittingReview || currentRating === 0}
                >
                  {isSubmittingReview ? "..." : t.submitReviewButton}
                </button>
                {reviewError && <div className="review-error-message">{reviewError}</div>}
              </div>
            ) : (
              <div className="review-success-message review-section">
                {t.reviewSubmittedMessage}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Translator;