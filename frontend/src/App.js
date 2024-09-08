import React, { useState } from 'react';

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [displayedNumber, setDisplayedNumber] = useState(null);

const getRandomNumber = async () => {
  setLoading(true);
  try {
    const response = await fetch('http://localhost:5000/random', {
      method: 'POST',
    });
    const data = await response.json();
    setRandomNumber(data.value);

    // Genera un intervalo aleatorio entre 40 y 80 milisegundos para la animación
    const randomInterval = Math.floor(Math.random() * (80 - 40 + 1)) + 40;

    // Simulo una animación para que se vea el número generado
    let currentNumber = 1;
    const interval = setInterval(() => {
      setDisplayedNumber(currentNumber);
      currentNumber++;
      if (currentNumber > 100) {
        currentNumber = 1;
      }
    }, randomInterval);

    setTimeout(() => {
      clearInterval(interval);
      setDisplayedNumber(data.value);
    }, 3000);  // Hago que la animación dure 3 segundos
  } catch (error) {
    console.error('Error fetching the random number:', error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Número aleatorio entre 1 y 100</h1>
      <button
        onClick={getRandomNumber}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          backgroundColor: loading ? '#ccc' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        {loading ? 'Obteniendo...' : 'Generar número'}
      </button>
      {displayedNumber !== null && (
        <h2 style={{ marginTop: '20px', fontSize: '24px', color: '#007bff' }}>
          Número generado: {displayedNumber}
        </h2>
      )}
    </div>
  );
}

export default App;
