import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import { CardDataProvider } from './Pages/context';
const App = () => {
  return (
    <CardDataProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </CardDataProvider>
  )
}
export default App;