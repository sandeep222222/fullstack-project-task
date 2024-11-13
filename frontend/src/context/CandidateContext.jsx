import axios from 'axios';
import { useEffect, createContext, useState } from 'react';

export const CandidateContext = createContext(null);

// Accessing environment variable for base URL
const url = import.meta.env.VITE_BASE_URL;
console.log('VITE_BASE_URL:', url);  // This will log the base URL, check if it is undefined

const CandidateContextProvider = (props) => {
  const [allCandidate, setAllCandidate] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const pageSize = 5;

  const fetchAllCandidate = async () => {
    try {
      const response = await axios.get(url);
      console.log('API Response:', response);
      setAllCandidate(response.data.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  useEffect(() => {
    async function loadCandidates() {
      await fetchAllCandidate();
    }
    loadCandidates();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const filterData = allCandidate.filter((candidate) =>
        Object.values(candidate).some((val) =>
          val.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredCandidates(filterData);
    } else {
      setFilteredCandidates([]);
    }
  };

  const candidatesToPaginate = searchTerm ? filteredCandidates : allCandidate;

  const totalPage = Math.ceil(candidatesToPaginate.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  const currentCandidates = candidatesToPaginate.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddButton = () => {
    setShowAddForm(true);
  };

  const contextValue = {
    allCandidate,
    setAllCandidate,
    currentCandidates,
    handleNext,
    handlePrevious,
    currentPage,
    totalPage,
    handleSearch,
    filteredCandidates,
    searchTerm,
    handleAddButton,
    showAddForm,
  };

  return (
    <CandidateContext.Provider value={contextValue}>
      {props.children}
    </CandidateContext.Provider>
  );
};

export default CandidateContextProvider;
