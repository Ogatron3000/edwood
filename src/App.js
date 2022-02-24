import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {Outlet} from "react-router-dom";
import {Suspense} from 'react'
import Spinner from "./components/Spinner";

function App() {
    return (
        <>
            <Navbar/>
            <main>
                <Suspense fallback={<Spinner />}>
                    <Outlet/>
                </Suspense>
            </main>
            <Footer/>
        </>
    );
}

export default App;
