import React from 'react';

const Alert = ({ message }) => {
    return (
        <div style={{ color: 'red', fontWeight: 'bold' }}>
            {message}
        </div>
    );
};

export default Alert;
