import React from 'react';
import './App.css';
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import { PurchasesView } from './Components/PurchasesView';
import { Purchase } from './Components/Purchase';
import { Login } from './Components/Login';
import { ToastContainer } from 'react-toastify';



function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
       <BrowserRouter>
       <Routes>
         <Route path='/' element={<PurchasesView/>}></Route>
         <Route path='/Login' element={<Login/>}></Route>
         <Route path='/Purchase/:id' element={<Purchase/>}></Route>
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
