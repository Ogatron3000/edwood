import {NavLink} from "react-router-dom";
import React from "react";

export default function FilmsControls({filter}) {
    const sortingFilters = ['popular', 'now_playing', 'upcoming'];

    const sorting = sortingFilters.map(sortingFilter => {
        const activeClass = filter === sortingFilter ? 'button-active' : '';
        const displayName = sortingFilter.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
        return (
            <NavLink to={`/${sortingFilter}/1`}
                     key={sortingFilter}
                     id={sortingFilter}
                     className={`button button-secondary ${activeClass}`}>
                {displayName}
            </NavLink>
        )
    });

    return (
        <>
            {sorting}
        </>
    )
}