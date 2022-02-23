import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Auth from "./components/Auth";
import FilmDetails from "./components/FilmDetails";
import ValidateHome from "./components/ValidateHome";
import SearchResults from "./components/SearchResults";
import {Provider} from "react-redux";
import store from "./store";
import RequiredAuth from "./components/RequiredAuth";
import Watchlist from "./components/Watchlist";
import {fetchWatchlist} from "./slices/watchlistSlice";
import PublicOnly from "./components/PublicOnly";

if (store.getState().auth.isLoggedIn) {
    store.dispatch(fetchWatchlist())
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App/>}>
                        <Route path="/" element={<ValidateHome/>}/>
                        <Route path="/:filter/:page" element={<ValidateHome/>}/>
                        <Route path='/film/:filmId' element={<FilmDetails/>}/>
                        <Route path='/search' element={<SearchResults/>}/>
                        <Route element={<PublicOnly/>}>
                            <Route path='/sign-in' element={<Auth/>}/>
                            <Route path='/sign-up' element={<Auth/>}/>
                        </Route>
                        <Route element={<RequiredAuth/>}>
                            <Route path="/watchlist" element={<Watchlist/>}/>
                        </Route>
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
