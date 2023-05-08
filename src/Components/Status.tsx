import React from 'react';

type StatusProps = {
    name: string;
    color: string;
  };

const Status: React.FC<StatusProps> = ({ name, color }) => {
  const styles = {
    container: {
      display: 'inline-block',
      backgroundColor: 'white',
      border: `1vw solid`,
      borderColor: color ? color : 'black',
      borderRadius: '2vw',
      padding: '8px 12px',
    },
    name: {
      margin: 0,
      color: color ? color : 'black',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.name}>{name}</h2>
    </div>
  );
};

export default Status;
