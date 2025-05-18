import React, { useState } from 'react';

const App: React.FC = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <h1>Hello, React with TypeScript!</h1>
            <p>Current count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
};

export default App;