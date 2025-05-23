import React from "react";

interface SearchBarProps {
    className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
    const [query, setQuery] = React.useState("");

    return (
        <div className={`search-bar ${className || ""}`}>
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