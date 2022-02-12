import {useEffect, useState} from "react";

export default function Cast({ cast }) {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setExpanded(cast.length < 30);
    }, []);

    function handleClick() {
        setExpanded(true)
    }

    const castElements = cast.map(c => <span key={c.id}>{c.name}</span>);

    return (
        <>
            {expanded ? castElements : castElements.slice(0, 30)}
            {!expanded && <span style={{cursor: "pointer"}} onClick={handleClick}>Show All...</span>}
        </>
    );
}
