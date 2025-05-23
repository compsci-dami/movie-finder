import React from "react";

interface SearchBarProps {
    className?: string;
    value: string;
    onChange: (value: string) => void;  
    onSubmit: (event: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ className, value, onChange, onSubmit }) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> )=> {
        if (e.key === "Enter") {
            // e.preventDefault();
            onSubmit(e);
        }
    };
    

    return (
        <div className={`search-bar ${className || ""}`}>
            <span className="search-icon">🔍</span>
            <input
                type="text"
                placeholder="Search for a movie..."
                value={value}
                onChange={e => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="search-input"
            />
            {value && (
                <button
                    className="clear-btn"
                    onClick={() => onChange("")}
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