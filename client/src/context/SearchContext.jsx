"use client";
import React, { createContext, useContext, useState, useMemo } from "react";
import qs from "qs";
import { useSearchParams } from "next/navigation";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("filters") || "";

  // Single source of truth for all filters
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedFilters, setSelectedFilters] = useState([]); // {id, label, type, value}

  // Group filters by type for easier query building
  const groupedFilters = useMemo(() => {
    return selectedFilters.reduce((acc, filter) => {
      if (!acc[filter.type]) acc[filter.type] = [];
      acc[filter.type].push(filter);
      return acc;
    }, {});
  }, [selectedFilters]);

  // Build the complete Strapi query
  const strapiQuery = useMemo(() => {
    const filters = { $and: [] };
    let sort = [];

    // 1. Search query from SearchForm
    if (searchQuery.trim()) {
      filters.$and.push({
        $or: [
          { title: { $containsi: searchQuery } },
          { categories: { name: { $containsi: searchQuery } } },
        ],
      });
    }

    // 2. Loop through grouped filters
    if (groupedFilters.size?.length) {
      filters.$and.push({
        sizes: { id: { $in: groupedFilters.size.map((f) => f.id) } },
      });
    }
    if (groupedFilters.color?.length) {
      filters.$and.push({
        colors: { id: { $in: groupedFilters.color.map((f) => f.id) } },
      });
    }
    if (groupedFilters.collection?.length) {
      filters.$and.push({
        collections: {
          id: { $in: groupedFilters.collection.map((f) => f.id) },
        },
      });
    }
    if (groupedFilters.fabric?.length) {
      filters.$and.push({
        fabrics: { id: { $in: groupedFilters.fabric.map((f) => f.id) } },
      });
    }

    // 3. Sort - only allow one sort option
    if (groupedFilters.sort?.length) {
      const sortValue = groupedFilters.sort[0].value; // take first one only
      if (sortValue === "price:asc") sort.push("price:asc");
      else if (sortValue === "price:desc") sort.push("price:desc");
      else if (sortValue === "featured") {
        filters.$and.push({ featured: { $eq: true } });
        sort.push("featured:desc");
      } else if (sortValue === "bestSeller") sort.push("totalSold:desc");
    }

    return qs.stringify(
      {
        filters: filters.$and.length ? filters : {},
        sort: sort.length ? sort : ["createdAt:desc"],
        populate: {
          images: true,
          colors: true,
          sizes: true,
        },
        pagination: { pageSize: 24 },
      },
      { encodeValuesOnly: true },
    );
  }, [searchQuery, groupedFilters]);

  // Handlers that both components will use
  const handleSearchQuery = (query) => setSearchQuery(query);

  const handleFilterChange = (e, label, type, id, value) => {
    const isChecked = e.target.checked;

    if (type === "sort") {
      // Sort is radio behavior - remove other sorts first
      setSelectedFilters((prev) => {
        const withoutSort = prev.filter((f) => f.type !== "sort");
        return isChecked
          ? [...withoutSort, { id, label, type, value }]
          : withoutSort;
      });
    } else {
      setSelectedFilters((prev) => {
        if (isChecked) {
          return [...prev, { id, label, type, value }];
        } else {
          return prev.filter((f) => !(f.id === id && f.type === type));
        }
      });
    }
  };

  const removeFilter = (id, type) => {
    setSelectedFilters((prev) =>
      prev.filter((f) => !(f.id === id && f.type === type)),
    );
  };

  const clearAll = () => setSelectedFilters([]);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        selectedFilters,
        strapiQuery,
        handleSearchQuery,
        handleFilterChange,
        removeFilter,
        clearAll,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within SearchProvider");
  return context;
};
