import React from 'react';
import { PageProps } from 'gatsby';

interface SearchForm {
  location: {
    state: { searchQuery: string };
  };
}

const SearchForm: React.FC<PageProps<SearchForm, any>> = ({
  location,
  pageContext
}) => {
  console.log({
      location,
      pageContext
  })

  return (
    <div>HELLO</div>
  );
};

export default SearchForm;
