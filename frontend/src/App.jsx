import { useState } from 'react';
// Assuming these components exist and are styled independently or don't require specific styling from App.jsx
import Dictionary from './components/Dictionary';
import Translator from './components/Translator';

// const Dictionary = () => <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9', textAlign: 'center' }}>Dictionary Component</div>;
// const Translator = () => <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9', textAlign: 'center' }}>Translator Component</div>;


// Placeholder components for demonstration if actual components are not available
function App() {
  // State to keep track of the active tab.
  // 'translator' will be the default active tab.
  const [activeTab, setActiveTab] = useState('translator');

  // Function to render the active component based on the activeTab state
  const renderActiveComponent = () => {
    if (activeTab === 'translator') {
      return <Translator />;
    } else if (activeTab === 'dictionary') {
      return <Dictionary />;
    }
    return null; // Should not happen with current setup
  };

  // Basic inline styles
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto', // Centers the container block itself
      padding: '16px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center', // Centers inline/inline-block content within the container
    },
    header: {
      marginBottom: '24px',
    },
    h1: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // Centers flex items (icon and text)
      fontSize: '28px',
      fontWeight: 'bold',
      color: 'white',
    },
    icon: {
      width: '32px',
      height: '32px',
      marginRight: '12px', // Keep some space between icon and text
      borderRadius: '4px',
    },
    nav: {
      marginBottom: '24px',
    },
    ul: {
      display: 'flex',
      justifyContent: 'center', // Centers the tab buttons
      listStyleType: 'none',
      padding: 0,
      borderBottom: '1px solid #ccc',
    },
    li: {
      marginRight: '4px', // Keep some space between tab buttons
    },
    // Ensure the last li doesn't have a right margin if you want perfect centering of the group
    // For simplicity, this is usually fine.
    button: {
      padding: '8px 16px',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      border: '1px solid transparent',
      borderBottom: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'background-color 0.15s ease-in-out, color 0.15s ease-in-out',
      backgroundColor: '#f0f0f0',
      color: '#555',
    },
    activeButton: {
      backgroundColor: '#007bff',
      color: 'white',
      boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
    },
    inactiveButtonHover: {
      backgroundColor: '#e0e0e0',
      color: '#333',
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.h1}>
          <img
            src="https://placehold.co/32x32/007bff/ffffff?text=A&font=arial"
            alt="App Icon"
            style={styles.icon}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/32x32/cccccc/000000?text=Err&font=arial";
            }}
          />
          Dictionary & Translator
        </h1>
      </header>

      {/* Tab Navigation Menu */}
      <nav style={styles.nav}>
        <ul style={styles.ul}>
          <li style={styles.li}>
            <button
              onClick={() => setActiveTab('translator')}
              style={{
                ...styles.button,
                ...(activeTab === 'translator' ? styles.activeButton : {})
              }}
              onMouseOver={(e) => {
                if (activeTab !== 'translator') {
                  e.currentTarget.style.backgroundColor = styles.inactiveButtonHover.backgroundColor;
                  e.currentTarget.style.color = styles.inactiveButtonHover.color;
                }
              }}
              onMouseOut={(e) => {
                 if (activeTab !== 'translator') {
                  e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
                  e.currentTarget.style.color = styles.button.color;
                }
              }}
            >
              Translator
            </button>
          </li>
          <li style={{ ...styles.li, marginRight: 0 }}> {/* Removed right margin for the last tab for better centering appearance */}
            <button
              onClick={() => setActiveTab('dictionary')}
              style={{
                ...styles.button,
                ...(activeTab === 'dictionary' ? styles.activeButton : {})
              }}
              onMouseOver={(e) => {
                if (activeTab !== 'dictionary') {
                  e.currentTarget.style.backgroundColor = styles.inactiveButtonHover.backgroundColor;
                  e.currentTarget.style.color = styles.inactiveButtonHover.color;
                }
              }}
              onMouseOut={(e) => {
                if (activeTab !== 'dictionary') {
                  e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
                  e.currentTarget.style.color = styles.button.color;
                }
              }}
            >
              Dictionary
            </button>
          </li>
        </ul>
      </nav>

      {/* Active Component Section */}
      {/* The main content area will also be centered due to styles.container.textAlign */}
      <main>
        {renderActiveComponent()}
      </main>

    </div>
  );
}

export default App;
