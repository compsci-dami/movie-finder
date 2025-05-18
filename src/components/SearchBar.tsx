import React from "react";


const SearchBar: React.FC = () => {
    const [query, setQuery] = React.useState("");

    return (
        <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
                type="text"
                placeholder="Search for a movie..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="search-input"
            />
            {query && (
                <button
                    className="clear-btn"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    type="button"
                >
                    ✖️
                </button>
            )}
        </div>
    );
};

export default SearchBar;