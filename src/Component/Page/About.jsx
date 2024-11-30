import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>About Me</h1>
      <p style={styles.paragraph}>
        Hello! I am <strong>Akash Kumar</strong>, a student at <strong>IIIT Delhi</strong>. 
        This website is a part of my assignment project, showcasing my skills and creativity. 
        Feel free to reach out to me at <a href="mailto:akash23012@iiitd.ac.in" style={styles.link}>akash23012@iiitd.ac.in</a>.
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    color: '#333',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  header: {
    fontSize: '4rem',
    marginBottom: '10px',
    color: '#007bff',
  },
  paragraph: {
    fontSize: '2.2rem',
    color: '#555',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default About;
