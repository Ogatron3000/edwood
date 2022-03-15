import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import {Outlet} from "react-router-dom";
import {Suspense} from 'react'
import Spinner from "./components/Spinner/Spinner";

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
