import { FC } from 'react';
import { useSpring, animated } from 'react-spring';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';
interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate,  }) => {
  const pageNumbers = [];
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const paginationProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 200, friction: 20 }
  });
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };
  return (
    <nav>
      {/* <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul> */}
      <animated.div style={paginationProps} className="flex items-center justify-between">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 disabled:opacity-50"
          >
            <FaArrowLeft />
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 disabled:opacity-50"
          >
            <FaArrowRight />
          </button>
        </animated.div>
    </nav>
  );
};

export default Pagination;
