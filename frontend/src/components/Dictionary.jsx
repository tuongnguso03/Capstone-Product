import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config'; // Ensure this path is correct

// Accept 'translations' as a prop
function Dictionary({ translations }) {
  const [dictionary, setDictionary] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(5);
  const [error, setError] = useState(null);

const fetchDictionary = async (pageNum, query = '') => {
    setError(null);
    try {
      const endpoint = query
        ? `${API_URL}/dictionary/search?q=${encodeURIComponent(query)}&page=${pageNum}&per_page=${perPage}`
        : `${API_URL}/dictionary?page=${pageNum}&per_page=${perPage}`;
      
      // *** FIX: Added header to bypass ngrok's browser warning page ***
      const response = await axios.get(endpoint, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });

      // Check if the response data is the array and set it
      if (response.data && Array.isArray(response.data.data)) {
        setDictionary(response.data.data);
      } else if (Array.isArray(response.data)) {
        // If the API returns a direct array
        setDictionary(response.data);
      }
      else {
        setDictionary([]);
        console.error("API response is not in the expected format:", response.data);
        setError(translations.dictionaryFetchError);
      }
    } catch (err) {
      setDictionary([]);
      // Log the full error for better debugging
      console.error("Error fetching dictionary:", err);
      setError(err.response?.data?.error || translations.dictionaryFetchError);
    }
  };

  useEffect(() => {
    fetchDictionary(page, searchQuery);
  }, [page]); // Removed searchQuery from dependencies to prevent re-fetch on every keystroke
               // Search is now triggered by form submission

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to page 1 for new search
    fetchDictionary(1, searchQuery);
  };

  const searchButtonStyle = {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    marginLeft: '8px',
    border: 'none',
    cursor: 'pointer',
  };
  const searchButtonHoverStyle = {
    backgroundColor: '#2563eb',
  };

  const paginationButtonStyle = {
    backgroundColor: '#E5E7EB',
    color: '#374151',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
  };
  const paginationButtonDisabledStyle = {
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      {/* Use translated title */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: 'white' }}>
        {translations.dictionaryLookupTitle}
      </h2>
      <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          // Use translated placeholder
          placeholder={translations.dictionarySearchPlaceholder}
          style={{
            border: '1px solid #ccc',
            padding: '8px',
            borderRadius: '4px',
            width: '28rem',
            maxWidth: 'calc(100% - 120px)',
            textAlign: 'center'
          }}
        />
        <button
          type="submit"
          style={searchButtonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = searchButtonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = searchButtonStyle.backgroundColor}
        >
          {/* Use translated button text */}
          {translations.dictionarySearchButton}
        </button>
      </form>

      {/* Use translated title */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', marginTop: '1.5rem', color: 'white' }}>
        {translations.dictionaryMainTitle}
      </h2>
      {error && <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}
      {dictionary.length > 0 ? (
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{
            backgroundColor: 'white',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
            borderRadius: '0.5rem',
            margin: '0 auto',
          }}>
            <thead>
              <tr style={{ backgroundColor: '#e5e7eb', color: '#4b5563', textTransform: 'uppercase', fontSize: '0.875rem' }}>
                {/* Use translated table headers */}
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'center' }}>{translations.dictionaryHeaderBahnar}</th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'center' }}>{translations.dictionaryHeaderEnglish}</th>
              </tr>
            </thead>
            <tbody>
              {dictionary.map((entry, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #eee' }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{entry.word}</td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{entry.definition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Use translated no results message
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#555' }}>{translations.dictionaryNoResults}</p>
      )}

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
        <button // This button decrements page (Previous)
          onClick={() => setPage(prev => Math.max(1, prev - 1))}
          disabled={page === 1}
          style={{ ...paginationButtonStyle, ...(page === 1 ? paginationButtonDisabledStyle : {}) }}
        >
          {translations.dictionaryPrevButton}
        </button>
        {/* Use translated page label */}
        <span style={{ textAlign: 'center', padding: '0 0.5rem', fontSize: '0.875rem', color: 'white' }}>
          {translations.dictionaryPageLabel} {page}
        </span>
        <button // This button increments page (Next)
          onClick={() => setPage(prev => prev + 1)}
          disabled={dictionary.length < perPage}
          style={{ ...paginationButtonStyle, ...(dictionary.length < perPage ? paginationButtonDisabledStyle : {}) }}
        >
          {translations.dictionaryNextButton}
        </button>
      </div>

      <style jsx>{`
        /* Your existing JSX styles remain here */
        table {
          table-layout: fixed;
          width: 100%;
          max-width: 1200px;
          min-width: 300px;
          margin-left: auto;
          margin-right: auto;
          color: black;
          border-collapse: collapse;
        }
        /* ... rest of your styles ... */
      `}</style>
    </div>
  );
}

export default Dictionary;