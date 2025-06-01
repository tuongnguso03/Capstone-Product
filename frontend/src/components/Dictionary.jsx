import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

// Define API_URL, replace with your actual API endpoint or import from a config file

function Dictionary() {
  const [dictionary, setDictionary] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(5);
  const [error, setError] = useState(null);

  // Fetch dictionary data
  const fetchDictionary = async (pageNum, query = '') => {

    setError(null);

    try {

      const endpoint = query

      ? `${API_URL}/dictionary/search?q=${encodeURIComponent(query)}&page=${pageNum}&per_page=${perPage}`

      : `${API_URL}/dictionary?page=${pageNum}&per_page=${perPage}`;

      const response = await axios.get(endpoint);

      setDictionary(response.data);

    } catch (err) {

      setError(err.response?.data?.error || 'Failed to fetch dictionary');

    }

  };

  useEffect(() => {
    fetchDictionary(page, searchQuery);
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
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
    color: '#374151', // <--- Added: Set a dark gray text color for contrast
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500', // <--- Added: Slightly bolder text
  };
  const paginationButtonDisabledStyle = {
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Tra cứu Từ điển</h2>
      <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search (try 'error', 'empty', 'full')"
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
          Search
        </button>
      </form>

      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', marginTop: '1.5rem' }}>Từ điển</h2>
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
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'center' }}>Từ gốc Bahnar</th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'center' }}>Nghĩa tiếng Anh</th>
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
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>Không có kết quả, hoặc đã hết kết quả.</p>
      )}

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
        <button
          onClick={() => setPage(prev => Math.max(1, prev - 1))}
          disabled={page === 1}
          style={{ ...paginationButtonStyle, ...(page === 1 ? paginationButtonDisabledStyle : {}) }}
        >
          Tiếp
        </button>
        <span style={{ textAlign: 'center', padding: '0 0.5rem', fontSize: '0.875rem' }}>Page {page}</span>
        <button
          onClick={() => setPage(prev => prev + 1)}
          disabled={dictionary.length < perPage}
          style={{ ...paginationButtonStyle, ...(dictionary.length < perPage ? paginationButtonDisabledStyle : {}) }}
        >
          Trước
        </button>
      </div>

      <style jsx>{`
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

        th, td {
          text-align: center !important;
          overflow: hidden;
          text-overflow: ellipsis;
          border: 1px solid #ddd;
          white-space: nowrap;
          box-sizing: border-box;
        }

        th:first-child,
        td:first-child {
          width: 33.33%;
        }

        th:last-child,
        td:last-child {
          width: 66.67%;
        }

        @media (max-width: 700px) {
          table {
            max-width: 95%;
          }
          th, td {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          th, td {
            font-size: 0.8rem;
            padding: 0.5rem;
          }
          input[type="text"] {
            width: calc(100% - 90px);
          }
          button {
            padding: 6px 12px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Dictionary;