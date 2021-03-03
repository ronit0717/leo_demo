import React from 'react';

const ErrorPage = ({ msg }) => {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    {msg ? msg : "404 | Not Found"}
                </p>
            </header>
        </div>
    );
}

export default ErrorPage