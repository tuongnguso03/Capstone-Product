import { API_URL } from '../config';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dictionary() {
  const [dictionary, setDictionary] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(50);
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

  // Initial fetch and fetch on page change
  useEffect(() => {
    fetchDictionary(page, searchQuery);
  }, [page]); // Only trigger on page change

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to page 1
    fetchDictionary(1, searchQuery); // Fetch with current searchQuery
  };

  return (
    <div className="mb-8 items-center">
        {/* Search Section */}
        <h2 className="text-xl font-semibold mb-2 text-center">Search Dictionary</h2>
        <div className="flex">
            <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words or definitions"
            style={{
                border: '1px solid #ccc',
                padding: '8px',
                borderRadius: '4px',
                flexGrow: 1,
                maxWidth: '28rem',
                textAlign: 'center'
            }}
            />
            <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
            Search
            </button>
        </div>

        {/* Dictionary List */}
        <h2 className="text-xl font-semibold mb-2 text-center">Dictionary</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {dictionary.length > 0 ? (
            <div className="overflow-x-auto w-full">
            <table className="bg-white shadow-md rounded-lg mx-auto">
                <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                    <th className="py-3 px-6 text-center">Word</th>
                    <th className="py-3 px-6 text-center">Definition</th>
                </tr>
                </thead>
                <tbody>
                {dictionary.map((entry, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 text-center truncate">{entry.word}</td>
                    <td className="py-4 px-6 text-center truncate">{entry.definition}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        ) : (
            <p className="text-center">No results found</p>
        )}

        {/* Pagination */}
        <div className="mt-4 flex gap-2 justify-center">
            <button
            onClick={() => setPage(prev => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="bg-gray-300 p-2 rounded disabled:opacity-50"
            >
            Previous
            </button>
            <span className="text-center">Page {page}</span>
            <button
            onClick={() => setPage(prev => prev + 1)}
            disabled={dictionary.length < perPage}
            className="bg-gray-300 p-2 rounded disabled:opacity-50"
            >
            Next
            </button>
        </div>

        {/* Inline CSS for Fixed Column Sizes, Centering, and Responsive Table */}
        <style jsx>{`
    table {
      table-layout: fixed; /* Enforces fixed column widths */
      width: 100%;
      max-width: 1080px; /* Table stays at 1080px max */
      min-width: 320px; /* Minimum width to prevent excessive shrinking */
      margin-left: auto;
      margin-right: auto;
    }
    th, td {
      text-align: center !important;
      overflow: hidden;
      text-overflow: ellipsis;
      border: 2px solid #4b5563;
      white-space: nowrap;
      box-sizing: border-box; /* Ensures padding doesn't affect width */
    }
    .flex, .flex-col {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    input, p, h2, div.text-red-500, span {
      text-align: center;
    }
    /* Responsive adjustments for smaller screens */
    @media (max-width: 1100px) {
      table {
        max-width: 100%; /* Allow table to shrink to fit viewport */
      }
      th, td {
        font-size: 0.9rem; /* Slightly reduce font size */
        border: 2px dashed #4b5563;
      }
    }
    @media (max-width: 600px) {
      th, td {
        font-size: 0.8rem; /* Further reduce font size */
        padding: 0.5rem; /* Reduce padding for better fit */
      }
    }
  `}</style>
    </div>
  );
}

export default Dictionary;