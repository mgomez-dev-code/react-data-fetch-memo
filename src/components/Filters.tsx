import type { ChangeEvent } from "react";

type SortOption = "price" | "rating" | "title";

interface FiltersProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  category: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
}

const Filters = ({
  searchTerm,
  onSearchChange,
  category,
  categories,
  onCategoryChange,
  sortBy,
  onSortChange,
}: FiltersProps) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(e.target.value);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as SortOption);
  };
  return (
    <div className="filters">
      <input
        className="filter-input"
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <select
        className="filter-select"
        value={category}
        onChange={handleCategoryChange}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        className="filter-select"
        value={sortBy}
        onChange={handleSortChange}
      >
        <option value="title">Title</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
};

export default Filters;
