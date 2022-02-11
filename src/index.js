import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import SignIn from "./components/SignIn";
import FilmDetails from "./components/FilmDetails";
import ValidateHome from "./components/ValidateHome";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App/>}>
                    <Route path="/" element={<ValidateHome/>}/>
                    <Route path="/:filter/:page" element={<ValidateHome/>}/>
                    <Route path='/sign-in' element={<SignIn/>}/>
                    <Route path='/film/:filmId' element={<FilmDetails/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
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
