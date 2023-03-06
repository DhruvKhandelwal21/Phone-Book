import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ContactList from './Pages/ContactList';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
       <Route path="/register" element={<Register />} />
       <Route path="/login" element={<Login />} />
       <Route path="/" element={<ContactList />} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
