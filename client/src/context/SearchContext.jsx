"use client";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import qs from "qs";
import { useSearchParams } from "next/navigation";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("filters") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize] = useState(6); // Initial page size = 6

  const groupedFilters = useMemo(() => {
    return selectedFilters.reduce((acc, filter) => {
      if (!acc[filter.type]) acc[filter.type] = [];
      acc[filter.type].push(filter);
      return acc;
    }, {});
  }, [selectedFilters]);

  const strapiQuery = useMemo(() => {
    const filters = { $and: [] };
    let sort = ["createdAt:desc"];

    if (searchQuery.trim()) {
      filters.$and.push({
        $or: [
          { name: { $containsi: searchQuery } },
          { category: { name: { $containsi: searchQuery } } },
        ],
      });
    }

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

    if (groupedFilters.sort?.length) {
      const sortValue = groupedFilters.sort[0].value;
      if (sortValue === "price:asc") sort = ["price:asc"];
      else if (sortValue === "price:desc") sort = ["price:desc"];
      else if (sortValue === "featured") {
        filters.$and.push({ featured: { $eq: true } });
        sort = ["createdAt:desc"];
      } else if (sortValue === "bestSeller") sort = ["totalSold:desc"];
    }

    return qs.stringify(
      {
        filters: filters.$and.length ? filters : {},
        sort,
        populate: {
          mainImage: true,
          colors: true,
          category: true,
        },
        pagination: { page: currentPage, pageSize },
      },
      { encodeValuesOnly: true },
    );
  }, [searchQuery, groupedFilters, currentPage, pageSize]);

  // Reset to page 1 when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedFilters]);

  const handleSearchQuery = (query) => setSearchQuery(query);

  const handleFilterChange = (e, label, type, id, value) => {
    const isChecked = e.target.checked;
    if (type === "sort") {
      setSelectedFilters((prev) => {
        const withoutSort = prev.filter((f) => f.type !== "sort");
        return isChecked
          ? [...withoutSort, { id, label, type, value: value || id }]
          : withoutSort;
      });
    } else {
      setSelectedFilters((prev) => {
        if (isChecked) {
          return [...prev, { id, label, type, value: value || id }];
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
        currentPage,
        setCurrentPage,
        pageCount,
        setPageCount,
        pageSize,
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
