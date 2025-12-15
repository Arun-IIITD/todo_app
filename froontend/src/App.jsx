import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";

function App() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-900 text-white'>

   {/* NAVBAR */}
   <Navbar />

   {/* MAIN */}
   <main className='flex-1 container mx-auto p-4'>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-Note" element={<CreateNote />} />
        
      </Routes>

   </main>

   {/* Footer */}
   <Footer />
    </div>

  )
}

export default App
