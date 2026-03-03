"use client";

interface SearchFilterProps {
  search: string;
  filter: string;
  setSearch: (value: string) => void;
  setFilter: (value: string) => void;
  resetPage: () => void;
}

export default function SearchFilter({
  search,
  filter,
  setSearch,
  setFilter,
  resetPage,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <input
        type="text"
        placeholder="Search by title..."
        className="flex-1 p-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400 outline-none transition"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          resetPage();
        }}
      />

      <select
        className="p-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-400 outline-none transition"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          resetPage();
        }}
      >
        <option value="">All</option>
        <option value="true">Completed</option>
        <option value="false">Pending</option>
      </select>
    </div>
  );
}