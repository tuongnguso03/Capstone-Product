import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { Star } from 'lucide-react'; // Import Star icon

// Accept 'translations' as a prop for i18n
function ReverseTranslator({ translations }) {
  // State for translation
  const [translationInput, setTranslationInput] = useState('');
  const [translationResult, setTranslationResult] = useState('');
  const [translationError, setTranslationError] = useState(null); // Changed from 'error' for consistency
  const [isTranslating, setIsTranslating] = useState(false); // Added isTranslating state

  // State for review
  const [currentRating, setCurrentRating] = useState(0);
  const [reviewError, setReviewError] = useState(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  const t = translations; // Use 't' for brevity, similar to Translator

  useEffect(() => {
    // Reset review states when the input text changes, indicating a new potential translation
    setIsReviewSubmitted(false);
    setCurrentRating(0);
    setReviewError(null);
  }, [translationInput]);

  // Handle translation
  const handleTranslate = async (e) => {
    e.preventDefault(); // Use form onSubmit
    setTranslationError(null);
    setTranslationResult('');
    setIsReviewSubmitted(false); // Reset review submission status for new translation
    setCurrentRating(0);       // Reset rating for new translation
    setReviewError(null);      // Reset review error for new translation
    setIsTranslating(true);

    if (!translationInput.trim()) {
      // Use translation key for error message, assuming it exists in 't'
      setTranslationError((t.translatorErrorPrefix || "Error: ") + (t.emptyInputError || "Please enter text to translate."));
      setIsTranslating(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/translate_en_ba`, { // Specific endpoint for reverse translation
        text: translationInput
      });
      setTranslationResult(response.data.translation);
    } catch (err) {
      // Use translation key for error message prefix
      setTranslationError((t.translatorErrorPrefix) + (err.response?.data?.detail || err.message));
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
      setReviewError(t.ratingRequiredMessage || "Please select a rating before submitting."); // Use translation key
      return;
    }
    setReviewError(null);
    setIsSubmittingReview(true);
    try {
      await axios.post(`${API_URL}/reviews/`, { // Common review endpoint
        src: translationInput,
        tgt: translationResult,
        rate: currentRating
      });
      setIsReviewSubmitted(true);
    } catch (err) {
      // Use translation key for review error prefix
      setReviewError((t.reviewErrorPrefix || "Review submission failed: ") + (err.response?.data?.detail || err.message));
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
            color: #ffffff; /* Kept from original ReverseTranslator, adjust if needed */
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
            min-height: 8rem; /* Adopted from Translator */
            resize: vertical; /* Adopted from Translator */
            font-size: 1.125rem;
            background-color: #ffffff;
            color: #000000; 
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            outline: none;
          }
          .translator-textarea:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3); /* Adopted from Translator */
          }
          .translator-button {
            background-color: #3b82f6;
            color: #ffffff;
            padding: 0.75rem;
            border-radius: 0.5rem;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.3s, box-shadow 0.3s; /* Adopted from Translator */
            font-size: 1rem; /* Adopted from Translator */
          }
          .translator-button:hover {
            background-color: #2563eb;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Adopted from Translator */
          }
          .translator-button:disabled { /* Added from Translator */
            background-color: #9ca3af;
            cursor: not-allowed;
          }
          .translator-result-container { /* Added from Translator */
            margin-top: 1.5rem;
          }
          .translator-result-label { /* Added from Translator, though not explicitly used in JSX for now */
            display: block;
            text-align: left;
            font-weight: 500;
            color: #ffffff; /* Assuming white text, adjust if needed */
            margin-bottom: 0.5rem;
            font-size: 1rem;
          }
          .translator-result {
            padding: 1rem;
            background-color: #f9fafb;
            border: 2px solid #e5e7eb; /* Adopted from Translator */
            border-radius: 0.5rem;
            min-height: 8rem;
            font-size: 1.125rem;
            color: #000000;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); /* Adopted from Translator */
            text-align: left;
            white-space: pre-wrap; 
          }
          .translator-error, .review-error-message { /* Merged and adopted from Translator */
            color: #ef4444;
            margin-top: 0.75rem; 
            font-size: 1rem; 
            text-align: left;
          }
          .review-section { /* Added from Translator */
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid #e5e7eb;
          }
          .review-heading { /* Added from Translator */
            font-size: 1.125rem;
            font-weight: 600;
            color: #ffffff; /* Assuming white text, adjust if needed */
            margin-bottom: 0.75rem;
          }
          .stars-container { /* Added from Translator */
            display: flex;
            justify-content: center;
            gap: 0.25rem; 
            margin-bottom: 1rem;
            cursor: pointer;
          }
          .star-icon { /* Added from Translator */
            color: #e5e7eb; 
            transition: color 0.2s;
          }
          .star-icon.filled { /* Added from Translator */
            color: #f59e0b; 
          }
          .star-icon:hover { /* Added from Translator */
            transform: scale(1.1); 
          }
          .review-success-message { /* Added from Translator */
            color: #10b981; 
            margin-top: 0.75rem;
            font-size: 1rem;
            font-weight: 500;
          }
        `}
      </style>
      <div className="translator-container">
        <h2 className="translator-heading">{t.revTranslatorHeadingEnBa}</h2> {/* Use translation key */}
        <form className="translator-form" onSubmit={handleTranslate}> 
            <textarea
              value={translationInput}
              onChange={(e) => setTranslationInput(e.target.value)}
              placeholder={t.revTranslatorPlaceholder} 
              className="translator-textarea"
              rows="4"
            />
            <button
              type="submit"
              className="translator-button"
              disabled={isTranslating} 
            >
              {isTranslating ? ("...") : (t.translatorButton)} {/* Use translation keys */}
            </button>
        </form>

        {translationError && <div className="translator-error">{translationError}</div>}

        {translationResult && (
          <div className="translator-result-container">
            {/* Optional: Label for result area, using t.translationResultLabel if available */}
            {/* <label className="translator-result-label">{t.translationResultLabel || "Translation:"}</label> */}
            <div id="translationOutput" className="translator-result">
              {translationResult} {/* Removed <p> for direct content rendering like Translator */}
            </div>

            {!isReviewSubmitted ? (
              <div className="review-section">
                <h3 className="review-heading">{t.rateThisTranslation}</h3>
                <div className="stars-container">
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <Star
                      key={starValue}
                      size={32} // Consistent star size
                      className={`star-icon ${currentRating >= starValue ? 'filled' : ''}`}
                      onClick={() => handleStarClick(starValue)}
                      // Removed hover effect via class toggle for simplicity, can be added if needed
                    />
                  ))}
                </div>
                <button
                  onClick={handleSubmitReview}
                  className="translator-button"
                  disabled={isSubmittingReview || currentRating === 0} // Disable if submitting or no rating
                >
                  {isSubmittingReview ? ("...") : (t.submitReviewButton)}
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

export default ReverseTranslator;