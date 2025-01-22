export const portfolioData = {
    personalInfo: {
        name: 'David Bucur',
        title: 'Software Developer',
        email: 'dbucur22@gmail.com',
        links: {
            github: 'bucurdavid',
            linkedin: 'David Bucur',
        },
    },

    about: {
        description:
            'Software Engineer with experience in full-stack development. Focused on seamless integration between software layers and continuously expanding my expertise in best development practices, testing methodologies, and various technologies to deliver effective solutions.',
    },

    skills: {
        languages: ['Rust', 'TypeScript', 'JavaScript', 'Python', 'C#', 'SQL'],
        frameworks: ['NodeJS', 'ReactJS', 'NestJS', 'NextJS', '.NET'],
        tools: ['MySQL', 'PostgreSQL', 'MongoDB'],
        platforms: ['AWS', 'Microsoft Azure'],
        softSkills: ['Adaptability', 'Problem-solving', 'Self-Awareness', 'Time Management'],
    },

    experience: [
        {
            title: 'Software Developer',
            company: 'Itheum',
            location: 'Remote',
            period: 'Nov 2022 — Present',
            description:
                'In my current role, my primary focus is on developing highly efficient and secure smart contracts and ensuring their optimal performance through rigorous testing. Additionally, I am responsible for building micro services that facilitate seamless communication between the front-end layer and the blockchain layer, with a specific focus on interoperability between smart contracts.',
            skills: ['Rust', 'TypeScript', 'NodeJS', 'Smart Contracts', 'Blockchain'],
        },
        {
            title: 'Web Scrapper',
            company: 'Rubrikk Group AS',
            location: 'Cluj-Napoca',
            period: 'Apr 2022 — Nov 2022',
            description:
                'I was a member of the Big Data team where I utilized Regular Expressions and XPath to create and maintain web crawlers. I also gained experience with SQL queries in BigQuery and worked directly with the C# and .NET framework to develop tools.',
            skills: [
                'Google BigQuery',
                'Microsoft Azure',
                '.NET Framework',
                'C#',
                'Regular Expressions',
                'XPath',
            ],
        },
    ],

    projects: [
        {
            title: 'Solana smart contract development',
            date: 'Jul 2024',
            description:
                'Contributed to several projects focused on smart contract development on the Solana blockchain. In these roles, I was responsible for designing and implementing smart contracts.',
            technologies: ['Rust', 'Solana Blockchain'],
        },
        {
            title: 'Liquid staking smart contract',
            date: 'Apr 2024',
            description:
                'The solution involved building a smart contract for a liquid staking protocol, where users deposited tokens and received receipt tokens in return. These receipt tokens represented their staked position and automatically accrued value from staking rewards. Since the receipt tokens followed standard token interfaces, users could utilize them across DeFi applications while their original assets remained staked.',
            technologies: ['Rust', 'MultiversX Blockchain'],
        },
        {
            title: 'NFT Ticketing system - SAGA Festival',
            date: 'Jun 2023',
            description:
                "Contributed to the development of a software solution aimed at enhancing festival experiences through the utilization of non-fungible tokens (NFTs). Played a key role in designing and implementing a secure smart contract that met the client's requirements.",
            technologies: ['Rust', 'NestJS', 'MySQL', 'MultiversX Blockchain'],
            url: 'https://linktr.ee/sagafestivalNFT',
        },
        {
            title: 'Dex metrics API',
            date: 'Apr 2023',
            description:
                "Developed a back-end system to track all trades executed within a smart contract, providing comprehensive metrics and analysis on tokens and trading volumes. Implemented a REST API adhering to CoinGecko's standards.",
            technologies: ['NestJS', 'PostgreSQL', 'TypeScript', 'MultiversX Blockchain'],
            url: 'https://swap.onedex.app/analytics',
        },
    ],

    education: [
        {
            institution: 'Technical University of Cluj-Napoca',
            degree: 'Bachelor of Engineering in Technology and Telecommunications Systems',
            field: 'Electronics, Telecommunications and Information Technology',
            period: 'Oct 2019 — Jul 2023',
            location: 'Cluj-Napoca',
        },
        {
            institution: 'National College "Simion Bărnuțiu"',
            field: 'Mathematics and Informatics',
            period: 'Sep 2015 — Jun 2019',
            location: 'Simleu Silvaniei',
        },
    ],

    languages: [
        {
            language: 'Romanian',
            level: 'Native speaker',
        },
        {
            language: 'English',
            level: 'Highly proficient',
        },
    ],
};
