export default function Cast({ crew }) {

    const jobsToDisplay =
        {
            Director: 'Director',
            Producer: 'Producer',
            Screenplay: 'Writer',
            Editor: 'Editor',
            'Director of Photography': 'Cinematographer',
            'Original Music Composer': 'Compositor',
        };

    const crewByJobs = crew.reduce((agg, c) => {
        let job = Object.keys(jobsToDisplay).find(key => key === c.job);
        if (job) {
            let namedJob = jobsToDisplay[job];
            agg[namedJob] = agg[namedJob] || [];
            agg[namedJob].push(c);
        }
        return agg;
    }, {})

    const elements = Object.entries(crewByJobs).map(([ job, crew ]) => {
        return (
            <div key={job}>
                <h3>{crew.length > 1 ? `${job}s` : job}</h3>
                {crew.map(c => c.name).join(", ")}
            </div>
        )
    })

    return (
        <>
            {elements}
        </>
    );
}