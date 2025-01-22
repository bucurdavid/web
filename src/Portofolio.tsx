import { useState, useEffect } from 'react';
import { Monitor, Code, Mail, Github, Linkedin, Link as LinkIcon } from 'lucide-react';
import { portfolioData } from './resume';
import GitHubActivity from './GithubActivity';
import GitHubContributions from './GitHubContributionGraph';

const Portfolio = () => {
    const [activeSection, setActiveSection] = useState('about');
    const [isVisible, setIsVisible] = useState(true);
    const { personalInfo, about, skills, experience, projects, education } = portfolioData;

    // Blink effect for the developer name
    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(v => !v);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const renderSkillSection = (skillList: any[], icon = '>') => (
        <div className="grid grid-cols-2 gap-4">
            {skillList.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2 group">
                    <span className="text-green-400/70">{icon}</span>
                    <span className="text-[#f0e68c] hover:text-[#fff5b1] transition-colors duration-300">
                        {skill}
                    </span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="relative min-h-screen bg-black text-green-400 p-12 font-mono overflow-hidden">
            <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black/20 bg-repeat-y bg-[length:100%_4px]" />
            <div className="fixed inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)]" />

            <div className="relative max-w-4xl mx-auto z-10">
                <header className="mb-16">
                    <h1 className="text-5xl font-bold mb-4 tracking-wider">
                        <span
                            className={`${
                                isVisible ? 'opacity-100' : 'opacity-85'
                            } transition-opacity duration-1000`}
                        >
                            {personalInfo.name}
                        </span>
                    </h1>
                    <p className="text-lg opacity-90">
                        {'> '}
                        {personalInfo.title}
                    </p>
                </header>

                <GitHubActivity />
                <div className="h-8" />
                <GitHubContributions />

                <nav className="mb-16 mt-4">
                    <ul className="flex space-x-8 text-lg">
                        {['ABOUT', 'PROJECTS', 'SKILLS', 'EXPERIENCE', 'EDUCATION'].map(section => (
                            <li
                                key={section}
                                onClick={() => setActiveSection(section.toLowerCase())}
                                className={`cursor-pointer transition-all duration-300
                  ${
                      activeSection === section.toLowerCase()
                          ? 'text-green-400 border-b-2 border-green-400'
                          : 'text-green-400/70'
                  }`}
                            >
                                {`> ${section}`}
                            </li>
                        ))}
                    </ul>
                </nav>

                <main className="relative">
                    {/* About Section */}
                    <section className={`${activeSection === 'about' ? 'block' : 'hidden'}`}>
                        <h2 className="text-2xl mb-6 flex items-center">
                            <Monitor className="mr-3" />
                            ABOUT.txt
                        </h2>
                        <div className="bg-gray-950 p-8 rounded-lg shadow-lg shadow-green-400/20">
                            <p className="leading-relaxed">{about.description}</p>
                        </div>
                    </section>

                    {/* Projects Section */}
                    <section className={`${activeSection === 'projects' ? 'block' : 'hidden'}`}>
                        <h2 className="text-2xl mb-6 flex items-center">
                            <Code className="mr-3" />
                            PROJECTS.rs
                        </h2>
                        <div className="space-y-6">
                            {projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-950 p-6 rounded-lg shadow-lg shadow-green-400/20"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-xl">{project.title}</h3>
                                            {project.url && (
                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-green-300 transition-colors duration-300"
                                                    aria-label={`Visit ${project.title} project`}
                                                >
                                                    <LinkIcon size={18} />
                                                </a>
                                            )}
                                        </div>
                                        <span className="text-sm text-green-400/70">
                                            {project.date}
                                        </span>
                                    </div>
                                    <p className="mb-4 opacity-80">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="text-sm bg-green-400/10 px-3 py-1 rounded"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Skills Section */}
                    <section className={`${activeSection === 'skills' ? 'block' : 'hidden'}`}>
                        <h2 className="text-2xl mb-6 flex items-center">
                            <Code className="mr-3" />
                            SKILLS.dat
                        </h2>
                        <div className="bg-gray-950 p-8 rounded-lg shadow-lg shadow-green-400/20 space-y-6">
                            <div>
                                <h3 className="text-xl mb-4">Languages</h3>
                                {renderSkillSection(skills.languages)}
                            </div>
                            <div>
                                <h3 className="text-xl mb-4">Frameworks</h3>
                                {renderSkillSection(skills.frameworks)}
                            </div>
                            <div>
                                <h3 className="text-xl mb-4">Tools</h3>
                                {renderSkillSection(skills.tools)}
                            </div>
                            <div>
                                <h3 className="text-xl mb-4">Platforms</h3>
                                {renderSkillSection(skills.platforms)}
                            </div>
                            <div>
                                <h3 className="text-xl mb-4">Soft Skills</h3>
                                {renderSkillSection(skills.softSkills)}
                            </div>
                        </div>
                    </section>

                    {/* Experience Section */}
                    <section className={`${activeSection === 'experience' ? 'block' : 'hidden'}`}>
                        <h2 className="text-2xl mb-6 flex items-center">
                            <Monitor className="mr-3" />
                            EXPERIENCE.md
                        </h2>
                        <div className="space-y-6">
                            {experience.map((job, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-950 p-6 rounded-lg shadow-lg shadow-green-400/20"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl">
                                            {job.title} @ {job.company}
                                        </h3>
                                        <span className="text-sm text-green-400/70">
                                            {job.period}
                                        </span>
                                    </div>
                                    <p className="text-sm text-green-400/70 mb-3">{job.location}</p>
                                    <p className="mb-4">{job.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {job.skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="text-sm bg-green-400/10 px-3 py-1 rounded"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education Section */}
                    <section className={`${activeSection === 'education' ? 'block' : 'hidden'}`}>
                        <h2 className="text-2xl mb-6 flex items-center">
                            <Monitor className="mr-3" />
                            EDUCATION.edu
                        </h2>
                        <div className="space-y-6">
                            {education.map((edu, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-950 p-6 rounded-lg shadow-lg shadow-green-400/20"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl">{edu.institution}</h3>
                                        <span className="text-sm text-green-400/70">
                                            {edu.period}
                                        </span>
                                    </div>
                                    <p className="text-green-400/70 mb-2">{edu.location}</p>
                                    {edu.degree && <p className="mb-2">{edu.degree}</p>}
                                    <p className="text-sm opacity-80">{edu.field}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                <footer className="mt-16 text-center">
                    <div className="flex justify-center space-x-6 mb-4">
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="hover:text-green-300 transition-colors duration-300 flex items-center"
                        >
                            <Mail className="mr-2" />
                            {personalInfo.email}
                        </a>
                        <a
                            href={`https://github.com/${personalInfo.links.github}`}
                            className="hover:text-green-300 transition-colors duration-300 flex items-center"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github className="mr-2" />
                            GitHub
                        </a>
                        <a
                            href={`https://linkedin.com/in/${personalInfo.links.linkedin
                                .toLowerCase()
                                .replace(' ', '-')}`}
                            className="hover:text-green-300 transition-colors duration-300 flex items-center"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Linkedin className="mr-2" />
                            LinkedIn
                        </a>
                    </div>
                    <p className="text-green-400/70">•• {new Date().getFullYear()} ••</p>
                </footer>
            </div>
        </div>
    );
};

export default Portfolio;
