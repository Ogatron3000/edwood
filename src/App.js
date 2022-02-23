import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {Outlet} from "react-router-dom";
import {Suspense} from 'react'

function App() {
    return (
        <>
            <Navbar/>
            <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet/>
                </Suspense>
            </main>
            <Footer/>
        </>
    );
}

export default App;
