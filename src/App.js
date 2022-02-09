import './App.css';
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import FilmList from "./components/FilmList";
import Footer from "./components/Footer";

function App() {
  return (
    <>
        <Navbar/>
        <Slider/>
        <FilmList/>
        <Footer/>
    </>
  );
}

export default App;
