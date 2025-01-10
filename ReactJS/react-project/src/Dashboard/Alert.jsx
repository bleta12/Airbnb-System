import React from 'react';

const Alert = ({ message, type, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: type === 'success' ? 'lightgreen' : 'red',
        color: 'white',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          marginLeft: '10px',
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        X
      </button>
    </div>
  );
};

export default Alert;
