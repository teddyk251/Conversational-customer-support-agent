import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import iremboLogo from './assets/irembo-gov.svg'
import { MdOutlineContactSupport } from "react-icons/md";
import './App.css'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NewPermit from './pages/NewPermit';
import RenewPermit from './pages/RenewPermit';


function App() {

  return (
    <Router>
      <div className="h-screen flex flex-col items-center text-center">
        <div className='p-5 bg-blue-600 w-full fixed z-10'>
          <div className='mx-9 lg:mx-80 flex'>
            <img src={iremboLogo} alt="vite logo" className='' />
            <div className='w-full flex justify-end '>
              {/* <Link to="/contact" className='flex items-center justify-center p-4 bg-blue-500 rounded-lg hover:bg-blue-600 cursor-pointer'>
                <MdOutlineContactSupport className='text-white text-sm lg:text-lg mr-2' />
                <div className='text-white text-sm lg:text-lg'>Contact Us</div>
              </Link> */}
            </div>
          </div>
        </div>
        {/* <div className="w-full flex justify-center mt-4">
          <Link to="/" className="mx-2 p-2 bg-gray-200 rounded">Home</Link>
          <Link to="/about" className="mx-2 p-2 bg-gray-200 rounded">About</Link>
        </div> */}
        <div className="flex-grow w-full h-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/new_permit' element={<NewPermit />} />
            <Route path='/renew_permit' element={<RenewPermit />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
