import { FaRegPlusSquare } from "react-icons/fa";
import {
  TfiMenuAlt,
  TfiLayoutGrid4Alt,
  TfiSearch,
  TfiAngleLeft,
  TfiAngleRight,
  TfiFilter,
} from "react-icons/tfi";
import { CandidateContext } from "../context/CandidateContext";
import { useContext, useEffect, useState } from "react";
import Item from "../components/Item";

const Candidate = () => {
  const {
    handleAddButton,
    currentCandidates,
    handleNext,
    handlePrevious,
    totalPage,
    currentPage,
    handleSearch,
    filteredCandidates,
  } = useContext(CandidateContext);

  const [candidateData, setCandidateData] = useState([]);

  useEffect(() => {
    setCandidateData(filteredCandidates.length > 0 ? filteredCandidates : currentCandidates);
  }, [currentCandidates, filteredCandidates]);

  // Ensure that when the filteredCandidates list is empty, pagination is reset to page 1.
  useEffect(() => {
    if (filteredCandidates.length === 0) {
      setCandidateData(currentCandidates);
    }
  }, [filteredCandidates, currentCandidates]);

  return (
    <>
      <div className="border border-gray-400 m-1 p-10">
        <div className="flex justify-between items-center mt-10 mb-5 border">
          <h3 className="text-2xl text-left font-[500]">Candidates</h3>
          <div className="py-1">
            <button
              className="text-xl text-right font-bold text-white bg-green-400 px-2 py-1"
              onClick={handleAddButton}
            >
              Add <FaRegPlusSquare className="inline text-white mb-[0.35rem]" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center border mb-5">
          <div className="flex border">
            <TfiMenuAlt fontSize={22} />
            <TfiLayoutGrid4Alt fontSize={20} className="ml-3" />
          </div>

          <div className="flex items-center">
            <div className="border border-gray-400 flex items-center rounded p-1 mx-1">
              <TfiSearch fontSize={20} className="text-green-400 mx-1" />
              <input
                type="text"
                placeholder="Search by Candidate, Email, Phone"
                className="outline-none w-[250px]"
                onChange={handleSearch}
              />
            </div>

            <div className="flex items-center mx-1">
              <h1 className="text-xl">{currentPage}/{totalPage}</h1>
            </div>

            <div className="flex items-center">
              <button
                className="border px-3 py-2 mx-2 text-green-700"
                disabled={currentPage === 1}
                onClick={handlePrevious}
              >
                <TfiAngleLeft />
              </button>
              <button
                className="border px-3 py-2 mx-2 text-green-700"
                disabled={currentPage === totalPage}
                onClick={handleNext}
              >
                <TfiAngleRight />
              </button>
              <button className="border px-3 py-2 ml-2 text-green-700">
                <TfiFilter style={{ width: "17px", height: "auto" }} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-green-100 flex border font-[500] text-center">
          <h1 className="flex-1 px-4 py-2">Candidate Name</h1>
          <h1 className="flex-1 px-4 py-2">Email</h1>
          <h1 className="flex-1 px-4 py-2">Phone</h1>
          <h1 className="flex-1 px-4 py-2">Higher Qualification</h1>
          <h1 className="flex-1 px-4 py-2">Current Experience</h1>
          <h1 className="flex-1 px-4 py-2">Skills/Technology</h1>
          <h1 className="flex-1 px-4 py-2">Action</h1>
        </div>

        {/* Conditional rendering of no candidates message */}
        {candidateData.length === 0 ? (
          <p className="text-center text-gray-500">No candidates found</p>
        ) : (
          candidateData.map((item) => {
            return (
              <Item
                key={item._id}
                name={item.name}
                email={item.email}
                phone={item.phone}
                qualification={item.qualification}
                experience={item.experience}
                skills={item.skills}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Candidate;
