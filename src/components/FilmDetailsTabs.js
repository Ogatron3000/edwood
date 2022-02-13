import Cast from "./Cast";
import Crew from "./Crew";
import ProductionDetails from "./ProductionDetails";
import {useState} from "react";

export default function FilmDetailsTabs({ film }) {
    const [activeTab, setActiveTab] = useState('cast');

    function activateTab(e) {
        setActiveTab(e.target.id);
    }

    return (
        <>
            <div className="film__tabs">
                <button
                    className={"button button-secondary " + (activeTab === 'cast' ? 'button-active' : '')}
                    id='cast'
                    onClick={activateTab}
                >
                    Cast
                </button>
                <button
                    className={"button button-secondary " + (activeTab === 'crew' ? 'button-active' : '')}
                    id='crew'
                    onClick={activateTab}
                >
                    Crew
                </button>
                <button
                    className={"button button-secondary " + (activeTab === 'details' ? 'button-active' : '')}
                    id='details'
                    onClick={activateTab}
                >
                    Details
                </button>
                <button
                    className={"button button-secondary " + (activeTab === 'genres' ? 'button-active' : '')}
                    id='genres'
                    onClick={activateTab}
                >
                    Genres
                </button>
            </div>
            <div className="film__tab-content">
                {activeTab === 'cast' && <Cast cast={film.credits.cast} />}
                {activeTab === 'crew' && <Crew crew={film.credits.crew} />}
                {activeTab === 'details' && <ProductionDetails film={film} />}
                {activeTab === 'genres' && film.genres.map(g => <span key={g.id}>{g.name}</span>)}
            </div>
        </>
    )
}