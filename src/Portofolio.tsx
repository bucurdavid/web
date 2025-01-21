import { useState, useEffect } from "react";
import { Monitor, Code, Mail, Github, Linkedin } from "lucide-react";
import GitHubActivity from "./GithubActivity";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [isVisible, setIsVisible] = useState(true);

  // Blink effect for the developer name
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((v) => !v);
    }, 1000); // Slower, more subtle blink rate
    return () => clearInterval(interval);
  }, []);

  const projects = [
    {
      title: "Project Alpha",
      description: "A full-stack web application built with React and Node.js",
      tech: ["React", "Node.js", "MongoDB"],
      link: "#",
    },
    {
      title: "Project Beta",
      description: "Real-time data visualization dashboard",
      tech: ["React", "D3.js", "WebSocket"],
      link: "#",
    },
    {
      title: "Project Gamma",
      description: "Mobile-first e-commerce platform",
      tech: ["React Native", "Redux", "Firebase"],
      link: "#",
    },
  ];

  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "TypeScript",
    "GraphQL",
    "MongoDB",
  ];

  return (
    <div className="relative min-h-screen bg-black text-green-400 p-12 font-mono overflow-hidden">
      {/* CRT Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black/20 bg-repeat-y bg-[length:100%_4px]" />
      <div className="fixed inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)]" />

      <div className="relative max-w-4xl mx-auto z-10">
        <header className="mb-16">
          <h1 className="text-5xl font-bold mb-4 tracking-wider">
            <span
              className={`${
                isVisible ? "opacity-100" : "opacity-85"
              } transition-opacity duration-1000`}
            >
              Bucur David
            </span>
          </h1>
          <p className="text-lg opacity-90">{"> "}Software Engineer</p>
        </header>
        <GitHubActivity />

        <nav className="mb-16 mt-4">
          <ul className="flex space-x-8 text-lg">
            {["ABOUT", "PROJECTS", "SKILLS", "CONTACT"].map((section) => (
              <li
                key={section}
                onClick={() => setActiveSection(section.toLowerCase())}
                className={`cursor-pointer transition-all duration-300
                  ${
                    activeSection === section.toLowerCase()
                      ? "text-green-400 border-b-2 border-green-400"
                      : "text-green-400/70"
                  }`}
              >
                {`> ${section}`}
              </li>
            ))}
          </ul>
        </nav>

        <main className="relative">
          {/* About Section */}
          <section
            className={`${activeSection === "about" ? "block" : "hidden"}`}
          >
            <h2 className="text-2xl mb-6 flex items-center">
              <Monitor className="mr-3" />
              ABOUT.txt
            </h2>
            <div className="bg-gray-950 p-8 rounded-lg shadow-lg shadow-green-400/20">
              <p className="mb-6 leading-relaxed">
                Hello, World! I'm a passionate developer with a love for
                creating elegant solutions to complex problems. With expertise
                in full-stack development, I specialize in building modern web
                applications using cutting-edge technologies.
              </p>
              <p className="leading-relaxed">
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community.
              </p>
            </div>
          </section>

          {/* Projects Section */}
          <section
            className={`${activeSection === "projects" ? "block" : "hidden"}`}
          >
            <h2 className="text-2xl mb-6 flex items-center">
              <Code className="mr-3" />
              PROJECTS.go
            </h2>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-950 p-6 rounded-lg shadow-lg shadow-green-400/20"
                >
                  <h3 className="text-xl mb-3">{project.title}</h3>
                  <p className="mb-4 opacity-80">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
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
          <section
            className={`${activeSection === "skills" ? "block" : "hidden"}`}
          >
            <h2 className="text-2xl mb-6 flex items-center">
              <Code className="mr-3" />
              SKILLS.dat
            </h2>
            <div className="bg-gray-950 p-8 rounded-lg shadow-lg shadow-green-400/20">
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-green-400/70">{">"}</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section
            className={`${activeSection === "contact" ? "block" : "hidden"}`}
          >
            <h2 className="text-2xl mb-6 flex items-center">
              <Mail className="mr-3" />
              CONTACT.txt
            </h2>
            <div className="bg-gray-950 p-8 rounded-lg shadow-lg shadow-green-400/20">
              <div className="flex items-center space-x-6">
                <a
                  href="mailto:email@example.com"
                  className="hover:text-green-300 transition-colors duration-300"
                >
                  <Mail className="mr-2 inline" />
                  email@example.com
                </a>
                <a
                  href="https://github.com"
                  className="hover:text-green-300 transition-colors duration-300"
                >
                  <Github className="mr-2 inline" />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  className="hover:text-green-300 transition-colors duration-300"
                >
                  <Linkedin className="mr-2 inline" />
                  LinkedIn
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-16 text-center text-green-400/70">
          <p>Made with ❤️ using React • {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;
