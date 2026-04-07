import React from "react";
import SearchForm from "../components/pages/search/SearchForm";
import SearchFilters from "../components/pages/search/SearchFilters";

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const filters = params.filters;
  console.log(filters);
  return (
    <div>
      <SearchForm filters={filters} />
      <SearchFilters />
    </div>
  );
};

export default page;
