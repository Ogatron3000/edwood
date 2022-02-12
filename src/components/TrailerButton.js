export default function TrailerButton({ videos }) {

    let trailerLink;
    if (videos.length) {
        let base = 'https://www.youtube.com/watch?v=';
        let trailer = videos.find(v => v.type === 'Trailer');
        if (trailer) {
            trailerLink = base + trailer.key;
        } else {
            trailerLink = base + videos[0].key;
        }
    }

    return (
        <>
            {trailerLink &&
                <a className="film__trailer button button-primary" href={trailerLink} target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                         fill="currentColor" stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round"
                         className="feather feather-play">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                    Trailer
                </a>
            }
        </>
    )
}