import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import EntertainersPage from './pages/EntertainerPage';
import AddEntertainerPage from './pages/AddEntertainerPage';
import EntertainerDetailPage from './pages/EntertainerDetailPage';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/entertainers" element={<EntertainersPage />} />
          <Route path="/entertainers/add" element={<AddEntertainerPage />} />
          <Route path="/entertainers/edit/:id" element={<AddEntertainerPage />} /> 
          <Route path="/entertainers/:id" element={<EntertainerDetailPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
