export default function Cast({ film }) {

    const {budget, production_companies, production_countries, spoken_languages} = film;

    return (
        <>
            <div>
                <h3>Budget</h3>
                <span>${budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
            </div>
            <div>
                <h3>{production_companies.length > 1 ? 'Studios' : 'Studio'}</h3>
                {production_companies.map(c => <span key={c.id}>{c.name}</span>)}
            </div>
            <div>
                <h3>{production_countries.length > 1 ? 'Countries' : 'Country'}</h3>
                {production_countries.map(c => <span key={c['iso_3166_1']}>{c['iso_3166_1']}</span>)}
            </div>
            <div>
                <h3>{spoken_languages.length > 1 ? 'Languages' : 'Language'}</h3>
                {spoken_languages.map(l => <span key={l.english_name}>{l.english_name}</span>)}
            </div>
        </>
    );
}
