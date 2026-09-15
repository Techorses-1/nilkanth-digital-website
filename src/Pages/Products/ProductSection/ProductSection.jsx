import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "./useDebounce";
import categoriesData from "../../../data/categories";
import productsData from "../../../data/products";
import "./ProductSection.scss";

const ProductSection = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchTerm, setSearchTerm] = useState("");
    const [categorySearch, setCategorySearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);

    const dropdownRef = useRef(null);
    const debouncedSearch = useDebounce(searchTerm, 400);

    // 👇 NEW: read ?category=<id> from URL and pre-select it
    useEffect(() => {
        const categoryIdFromUrl = searchParams.get("category");

        if (categoryIdFromUrl) {
            const matchedCategory = categoriesData.find(
                (cat) => cat.id === categoryIdFromUrl
            );
            if (matchedCategory) {
                setSelectedCategory(matchedCategory);
            }
        } else {
            setSelectedCategory(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    // close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // show loader while debounce is "in flight"
    useEffect(() => {
        if (searchTerm !== debouncedSearch) {
            setIsFiltering(true);
        }
    }, [searchTerm, debouncedSearch]);

    useEffect(() => {
        setIsFiltering(true);
        const timer = setTimeout(() => setIsFiltering(false), 250);
        return () => clearTimeout(timer);
    }, [debouncedSearch, selectedCategory]);

    const filteredCategoriesForDropdown = useMemo(() => {
        if (!categorySearch.trim()) return categoriesData;
        return categoriesData.filter((cat) =>
            cat.name.toLowerCase().includes(categorySearch.toLowerCase())
        );
    }, [categorySearch]);

    const categoryNameById = useMemo(() => {
        const map = {};
        categoriesData.forEach((cat) => {
            map[cat.id] = cat.name;
        });
        return map;
    }, []);

    const filteredProducts = useMemo(() => {
        const term = debouncedSearch.trim().toLowerCase();

        return productsData.filter((product) => {
            const categoryName = categoryNameById[product.category] || "";

            const matchesCategory = selectedCategory
                ? product.category === selectedCategory.id
                : true;

            const matchesSearch = term
                ? product.name.toLowerCase().includes(term) ||
                categoryName.toLowerCase().includes(term)
                : true;

            return matchesCategory && matchesSearch;
        });
    }, [debouncedSearch, selectedCategory, categoryNameById]);

    // 👇 UPDATED: also sync the URL query param when user picks manually from dropdown
    const handleSelectCategory = (cat) => {
        setSelectedCategory(cat);
        setIsDropdownOpen(false);
        setCategorySearch("");
        setSearchParams({ category: cat.id });
    };

    // 👇 UPDATED: clear URL query param too
    const handleClearCategory = () => {
        setSelectedCategory(null);
        setIsDropdownOpen(false);
        setCategorySearch("");
        setSearchParams({});
    };

    return (
        <section className="product-section">
            <div className="product-section-header">
                <h2>Our Products</h2>

                <div className="product-filters">
                    <div className="filter-search">
                        <svg viewBox="0 0 24 24" fill="none" className="search-icon">
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
                            placeholder="Search products or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="filter-category-dropdown" ref={dropdownRef}>
                        <button
                            type="button"
                            className="dropdown-toggle"
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                        >
                            <span>{selectedCategory ? selectedCategory.name : "All Categories"}</span>
                            <svg
                                className={`chevron ${isDropdownOpen ? "open" : ""}`}
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M6 9l6 6 6-6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="dropdown-panel">
                                <input
                                    type="text"
                                    className="dropdown-search"
                                    placeholder="Search category..."
                                    value={categorySearch}
                                    onChange={(e) => setCategorySearch(e.target.value)}
                                    autoFocus
                                />
                                <ul
                                    className="dropdown-list"
                                    onWheel={(e) => {
                                        e.stopPropagation();
                                        const el = e.currentTarget;
                                        const atTop = el.scrollTop === 0 && e.deltaY < 0;
                                        const atBottom =
                                            el.scrollTop + el.clientHeight >= el.scrollHeight && e.deltaY > 0;

                                        if (!atTop && !atBottom) {
                                            e.preventDefault();
                                        }
                                        el.scrollTop += e.deltaY;
                                    }}
                                >
                                    <li
                                        className={`dropdown-item ${!selectedCategory ? "active" : ""}`}
                                        onClick={handleClearCategory}
                                    >
                                        All Categories
                                    </li>
                                    {filteredCategoriesForDropdown.length === 0 && (
                                        <li className="dropdown-empty">No category found</li>
                                    )}
                                    {filteredCategoriesForDropdown.map((cat) => (
                                        <li
                                            key={cat.id}
                                            className={`dropdown-item ${selectedCategory?.id === cat.id ? "active" : ""
                                                }`}
                                            onClick={() => handleSelectCategory(cat)}
                                        >
                                            {cat.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="product-grid-wrap">
                {isFiltering ? (
                    <div className="product-grid loading-grid">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div className="product-card skeleton-card" key={i}>
                                <div className="skeleton-img" />
                                <div className="skeleton-line short" />
                                <div className="skeleton-line" />
                            </div>
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <p className="no-results">No products found. Try a different search.</p>
                ) : (
                    <div className="product-grid">
                        {filteredProducts.map((product) => (
                            <div className="product-card" key={product.id}>
                                <div className="product-card-img">
                                    <img src={product.image} alt={product.name} loading="lazy" />
                                </div>
                                <div className="product-card-info">
                                    <p className="product-name">{product.name}</p>
                                    <p className="product-category">
                                        {categoryNameById[product.category]}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductSection;