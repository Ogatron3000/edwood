import {Fragment} from "react";

export default function Cast({ crew }) {

    const jobsDisplayNames =
        {
            Director: 'Director',
            Producer: 'Producer',
            Screenplay: 'Writer',
            Editor: 'Editor',
            'Director of Photography': 'Cinematographer',
            'Original Music Composer': 'Compositor',
        };

    const crewByJob = crew.reduce((agg, c) => {
        let job = Object.keys(jobsDisplayNames).find(key => key === c.job);
        if (job) {
            let namedJob = jobsDisplayNames[job];
            agg[namedJob] = agg[namedJob] || [];
            agg[namedJob].push(c);
        }
        return agg;
    }, {})

    const orderedJobs = ['Director', 'Producer', 'Writer', 'Editor', 'Cinematographer', 'Compositor'];

    const elements = orderedJobs.map(job => {
        return (
            <Fragment key={job}>
                {crewByJob[job] &&
                    <div>
                        <h3>{crewByJob[job].length > 1 ? `${job}s` : job}</h3>
                        {crewByJob[job].map(crewMember => <span key={crewMember.id}>{crewMember.name}</span>)}
                    </div>
                }
            </Fragment>
        )
    });

    return (
        <>
            {elements}
        </>
    );
}