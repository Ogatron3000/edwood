import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes, Outlet} from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import FilmDetails from "./components/FilmDetails";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/:filter" element={<Home/>}/>
                    <Route path='/sign-in' element={<SignIn/>}/>
                    <Route path='/films/:filmId' element={<FilmDetails/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
