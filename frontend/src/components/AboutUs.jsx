

function AboutUs({ translations }) {
  // State to hold the current time

  // Effect to update the time every second


  // Inline styles for the component
  const styles = {
    container: {
      padding: '24px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      textAlign: 'left',
      color: '#333',
    },
    section: {
      marginBottom: '24px',
    },
    h2: {
      fontSize: '22px',
      fontWeight: '600',
      borderBottom: '2px solid #007bff',
      paddingBottom: '8px',
      marginBottom: '16px',
        color: "#f6f6f6"
    },
    p: {
      fontSize: '16px',
      lineHeight: '1.6',
      marginBottom: '12px',
      color: "#f6f6f6"
    },
    footer: {
      marginTop: '24px',
      paddingTop: '16px',
      borderTop: '1px solid #ddd',
      fontSize: '14px',
    },
  };

  // Render the component
  return (
    <div style={styles.container}>
      <section style={styles.section}>
        <h2 style={styles.h2}>{translations.aboutTitle}</h2>
        <p style={styles.p}>
          {translations.aboutDescription}
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>{translations.aboutTeamTitle}</h2>
        <p style={styles.p}>
          {translations.aboutTeamDescription}
        </p>
      </section>

      <footer style={styles.footer}>
        <h2 style={styles.h2}>{translations.aboutContactTitle}</h2>
        <p style={styles.p}>
          {translations.aboutContactEmail}
        </p>
      </footer>
    </div>
  );
}

export default AboutUs;