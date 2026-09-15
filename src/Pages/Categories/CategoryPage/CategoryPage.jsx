import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../Products/ProductSection/useDebounce";
import categoriesData from "../../../data/categories";
import "./CategoryPage.scss";

const CategoryPage = () => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [isFiltering, setIsFiltering] = useState(false);

    const debouncedSearch = useDebounce(searchTerm, 400);

    useEffect(() => {
        setIsFiltering(true);
        const timer = setTimeout(() => setIsFiltering(false), 250);
        return () => clearTimeout(timer);
    }, [debouncedSearch]);

    const filteredCategories = useMemo(() => {
        const term = debouncedSearch.trim().toLowerCase();
        if (!term) return categoriesData;
        return categoriesData.filter((cat) =>
            cat.name.toLowerCase().includes(term)
        );
    }, [debouncedSearch]);

    const handleCategoryClick = (categoryId) => {
        navigate(`/product?category=${categoryId}`);
    };

    return (
        <section className="cat-page-section">
            <div className="cat-page-header">
                <h2>All Categories</h2>

                <div className="cat-page-filter-search">
                    <svg viewBox="0 0 24 24" fill="none" className="cat-page-search-icon">
                        <path
                            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="cat-page-grid-wrap">
                {isFiltering ? (
                    <div className="cat-page-grid cat-page-loading-grid">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div className="cat-page-card cat-page-skeleton-card" key={i}>
                                <div className="cat-page-skeleton-img" />
                                <div className="cat-page-skeleton-line" />
                            </div>
                        ))}
                    </div>
                ) : filteredCategories.length === 0 ? (
                    <p className="cat-page-no-results">
                        No category found. Try a different search.
                    </p>
                ) : (
                    <div className="cat-page-grid">
                        {filteredCategories.map((cat) => (
                            <div
                                className="cat-page-card"
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat.id)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleCategoryClick(cat.id);
                                }}
                            >
                                <div className="cat-page-card-img">
                                    <img src={cat.image} alt={cat.name} loading="lazy" />
                                </div>
                                <p className="cat-page-card-name">{cat.name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default CategoryPage;