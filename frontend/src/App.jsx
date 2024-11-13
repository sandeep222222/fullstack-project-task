import { useContext } from "react";
import Candidate from "./pages/Candidate";
import { CandidateContext } from "./context/CandidateContext";
import AddCandidate from "./components/AddCandidate";
import CandidateContextProvider from './context/CandidateContext';

function App() {
  return (
    <CandidateContextProvider> {/* Wrap the entire app here */}
      <AppContent />
    </CandidateContextProvider>
  );
}

const AppContent = () => {
  const { showAddForm } = useContext(CandidateContext);

  return (
    <>
      {showAddForm && <AddCandidate />}
      <Candidate />
    </>
  );
};

export default App;
