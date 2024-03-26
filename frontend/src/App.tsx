import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
