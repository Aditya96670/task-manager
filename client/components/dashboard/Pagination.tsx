"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-4 mt-12">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="px-4 py-1.5 border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-100 transition text-gray-900"
      >
        Prev
      </button>

      <span className="text-gray-900 font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="px-4 py-1.5 border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-100 transition text-gray-900"
      >
        Next
      </button>
    </div>
  );
}