// In App.jsx
import { useState } from 'react';
// Assuming these components exist and are styled independently
import Dictionary from './components/Dictionary'; // Adjust path if needed
import Translator from './components/Translator'; // Adjust path if needed
import ReverseTranslator from './components/ReverseTranslator'; // Adjust path if needed

// Import translations from the separate file
import { translations } from './translations'; // Adjust path if your file is elsewhere (e.g., './locales/translations')

// const API_URL = '...'; // If App.jsx itself doesn't use API_URL, no need to import/define it here

function App() {
  const [activeTab, setActiveTab] = useState('translator');
  const [language, setLanguage] = useState('vi'); // Default language

  // Get current translations based on selected language
  const t = translations[language];

  const renderActiveComponent = () => {
    if (activeTab === 'translator') {
      return <Translator translations={t} />;
    } else if (activeTab === 'dictionary') {
      return <Dictionary translations={t} />;
    } else if (activeTab === 'rev-translator') {
      return <ReverseTranslator translations={t} />;
    }
    return null;
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '16px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
    },
    header: {
      marginBottom: '24px',
    },
    h1: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '28px',
      fontWeight: 'bold',
      color: 'white', // Assuming your page has a dark background or you'll set one
    },
    icon: {
      width: '32px',
      height: '32px',
      marginRight: '12px',
      borderRadius: '4px',
    },
    nav: {
      marginBottom: '24px',
    },
    ul: {
      display: 'flex',
      justifyContent: 'center',
      listStyleType: 'none',
      padding: 0,
      borderBottom: '1px solid #ccc',
    },
    li: {
      marginRight: '4px',
    },
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
    },
    langSwitcher: { // Styles for the language switcher
      marginBottom: '16px',
      textAlign: 'right', // Align to the right, or 'center'/'left' as you prefer
    },
    langButton: {
      padding: '6px 12px',
      margin: '0 4px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      cursor: 'pointer',
      color: "black",
      backgroundColor: '#f9f9f9',
    },
    activeLangButton: {
      backgroundColor: '#007bff',
      color: 'white',
      borderColor: '#007bff',
    }
  };

  return (
    <div style={styles.container}>
      {/* 4. Language Switcher */}
      <div style={styles.langSwitcher}>
        <button
          onClick={() => setLanguage('en')}
          style={{
            ...styles.langButton,
            ...(language === 'en' ? styles.activeLangButton : {})
          }}
          disabled={language === 'en'}
        >
          {t.langButtonEN}
        </button>
        <button
          onClick={() => setLanguage('vi')}
          style={{
            ...styles.langButton,
            ...(language === 'vi' ? styles.activeLangButton : {})
          }}
          disabled={language === 'vi'}
        >
          {t.langButtonVI}
        </button>
      </div>

      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.h1}>
          <img
            src="Alice_Halo.ico"
            alt={t.appIconAlt}
            style={styles.icon}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/32x32/cccccc/000000?text=TR&font=arial";
            }}
          />
          {t.appTitle} {/* 3. Use translated title */}
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
              {t.tabTranslator} {/* 3. Use translated tab name */}
            </button>
          </li>
          <li style={styles.li}>
            <button
              onClick={() => setActiveTab('rev-translator')}
              style={{
                ...styles.button,
                ...(activeTab === 'rev-translator' ? styles.activeButton : {})
              }}
              onMouseOver={(e) => {
                if (activeTab !== 'rev-translator') {
                  e.currentTarget.style.backgroundColor = styles.inactiveButtonHover.backgroundColor;
                  e.currentTarget.style.color = styles.inactiveButtonHover.color;
                }
              }}
              onMouseOut={(e) => {
                  if (activeTab !== 'rev-translator') {
                  e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
                  e.currentTarget.style.color = styles.button.color;
                }
              }}
            >
              {t.tabRevTranslator} {/* 3. Use translated tab name */}
            </button>
          </li>
          <li style={{ ...styles.li, marginRight: 0 }}>
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
              {t.tabDictionary} {/* 3. Use translated tab name */}
            </button>
          </li>
        </ul>
      </nav>

      <main>
        {renderActiveComponent()}
      </main>

    </div>
  );
}

export default App;