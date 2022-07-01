const technologies = [
    {
        "technology": "React",
        "quadrant": "languages and frameworks",
        "evaluationPhase": "Adopt",
        "statusOfTechnology": "No-change"
    }   ,

    {
        "technology": "C#",
        "quadrant": "languages and frameworks",
        "evaluationPhase": "Hold",
        "statusOfTechnology": "Moved-out"
    },

    {
        "technology": "Java",
        "quadrant": "languages and frameworks",
        "evaluationPhase": "Hold",
        "statusOfTechnology": "Moved-out"
    },

    {
        "technology": "Kotlin",
        "quadrant": "languages and frameworks",
        "evaluationPhase": "Assess",
        "statusOfTechnology": "Moved-in"
    },

    {
        "technology": "Spring Framework",
        "quadrant": "languages and frameworks", 
        "evaluationPhase": "Trial",
        "statusOfTechnology": "Moved-in"
    },

    {
        "technology": "Golang",
        "quadrant": "languages and frameworks", 
        "evaluationPhase": "Adopt",
        "statusOfTechnology": "Moved-in"
    },

    {
        "technology": "Python",
        "quadrant": "languages and frameworks", 
        "evaluationPhase": "Adopt",
        "statusOfTechnology": "No-change"
    },

    {
        "technology": "Django",
        "quadrant": "languages and frameworks", 
        "evaluationPhase": "Adopt",
        "statusOfTechnology": "New"
    },

    {
        "technology": "Node",
        "quadrant": "languages and frameworks", 
        "evaluationPhase": "Adopt",
        "statusOfTechnology": "No-change"
    },

    {
        "technology": "Angular",
        "quadrant": "languages and frameworks", 
        "evaluationPhase": "Trial",
        "statusOfTechnology": "Moved-in"
    },

    {
        "technology": "Vue",
        "quadrant": "languages and frameworks", 
        "evaluationPhase": "Adopt",
        "statusOfTechnology": "No-change"
    },

    {
        "technology": "Bootstrap",
        "quadrant": "languages and frameworks", 
        "evaluationPhase": "Assess",
        "statusOfTechnology": "No-change"
    },

    {
        "technology": "Go",
        "quadrant": "languages and frameworks", 
        "evaluationPhase": "Hold",
        "statusOfTechnology": "Moved-out"
    },

    {
        "technology": "GraphQL",
        "quadrant": "languages and frameworks", 
        "evaluationPhase": "Adopt",
        "statusOfTechnology": "No-change"
    },

    {
        "technology": "Javascrpt",
        "quadrant": "languages and frameworks", 
        "evaluationPhase": "Hold",
        "statusOfTechnology": "Moved-out"
    },

    {
        "technology": "TypeScript",
        "quadrant": "languages and frameworks", 
        "evaluationPhase": "Adopt",
        "statusOfTechnology": "No-change"
    },

    {
        "technology": "Azure Kubernetes Service",
        "quadrant": "platforms", 
        "evaluationPhase": "Adopt",
        "statusOfTechnology": "No-change"
    },

    {
        "technology": "Azure Managed Postgres",
        "quadrant": "platforms", 
        "evaluationPhase": "Assess",
        "statusOfTechnology": "Moved-in"
    },

    {
        "technology": "Cloudflare",
        "quadrant": "platforms", 
        "evaluationPhase": "Trial",
        "statusOfTechnology": "Moved-in"
    },

    {
        "technology": "Docker",
        "quadrant": "platforms", 
        "evaluationPhase": "Adopt",
        "statusOfTechnology": "Moved-in"
    },

    {
        "technology": "Hasura",
        "quadrant": "platforms", 
        "evaluationPhase": "Hold",
        "statusOfTechnology": "Moved-out"
    },

    {
        "technology": "HAProxy",
        "quadrant": "platforms", 
        "evaluationPhase": "Trial",
        "statusOfTechnology": "No-change"
    },

    {
        "technology": "Grafana",
        "quadrant": "platforms", 
        "evaluationPhase": "Assess",
        "statusOfTechnology": "Moved-in"
    },

    {
        "technology": "Nginx",
        "quadrant": "platforms", 
        "evaluationPhase": "Adopt",
        "statusOfTechnology": "No-change"
    },

    {
        "technology": "Sentry",
        "quadrant": "platforms", 
        "evaluationPhase": "Assess",
        "statusOfTechnology": "No-change"
    },
    
    {
        "technology": "Twemproxy",
        "quadrant": "platforms", 
        "evaluationPhase": "Hold",
        "statusOfTechnology": "No-change"
    },

    {
        "technology": "Satis",
        "quadrant": "platforms", 
        "evaluationPhase": "Adopt",
        "statusOfTechnology": "No-change"
    },

    {
        "technology": "Github Actions",
        "quadrant": "tools", 
        "evaluationPhase": "Adopt",
        "statusOfTechnology": "No-change"
    },

    {
        "technology": "Linear",
        "quadrant": "tools", 
        "evaluationPhase": "Trial",
        "statusOfTechnology": "Moved-in"
    },

    {
        "technology": "Notion",
        "quadrant": "tools", 
        "evaluationPhase": "Adopt",
        "statusOfTechnology": "Moved-in"
    },

    {
        "technology": "Traefik",
        "quadrant": "tools", 
        "evaluationPhase": "assess",
        "statusOfTechnology": "Moved-in"
    },

    {
        "technology": "Chtulhu",
        "quadrant": "tools", 
        "evaluationPhase": "Hold",
        "statusOfTechnology": "Moved-out"
    },

    {
        "technology": "Twig",
        "quadrant": "tools", 
        "evaluationPhase": "Trial",
        "statusOfTechnology": "No-change"
    },

    {
        "technology": "GraphWalker",
        "quadrant": "tools", 
        "evaluationPhase": "Adopt",
        "statusOfTechnology": "Moved-in"
    },

    {
        "technology": "four key metrics",
        "quadrant": "techniques", 
        "evaluationPhase": "Adopt",
        "statusOfTechnology": "No-change"
    },

    {
        "technology": "single team remote wall",
        "quadrant": "techniques", 
        "evaluationPhase": "Trial",
        "statusOfTechnology": "No-change"
    },

    {
        "technology": "Data mesh",
        "quadrant": "techniques", 
        "evaluationPhase": "Adopt",
        "statusOfTechnology": "Moved-in"
    },

    {
        "technology": "definition of production readiness (DPR)",
        "quadrant": "techniques", 
        "evaluationPhase": "Assess",
        "statusOfTechnology": "New"
    },

    {
        "technology": "server-driven UI",
        "quadrant": "techniques", 
        "evaluationPhase": "Adopt",
        "statusOfTechnology": "Moved-in"
    },

    {
        "technology": "team cognitive load",
        "quadrant": "techniques", 
        "evaluationPhase": "Hold",
        "statusOfTechnology": "Moved-out"
    },
]

export {technologies}

// const techniques = ["four key metrics", "single team remote wall ", "Data mesh", 
// "definition of production readiness (DPR)"]

// const Tools = ["Github Actions", "Linear", "Notion", "Traefik", "Chtulhu", "Twig", "GraphWalker"]

// const platforms = ["Azure Kubernetes Service","Azure Managed Postgres","Cloudflare",
//     "Docker", "Hasura", "HAProxy","Grafana","Nginx","Sentry","Twemproxy"
//     ,"Satis"
// ]

// const languagesAndFrameworks = [
//     "React" ,"C-sharp", "Java", "Kotlin", "Spring Framework", "Golang","Python", "Django",
//     "Node", "Angular", "Vue", "Bootstrap", "Go", "GraphQL", "JavaScript", "TypeScript"
// ]