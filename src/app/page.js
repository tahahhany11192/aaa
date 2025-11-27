'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
// Icon imports have been removed to avoid Module Not Found errors.

// --- Component Data ---

const featuredProjects = [
  {
    title: 'Real-Time Chat Application',
    description: 'A full-stack application leveraging WebSockets for instant message delivery and secure user authentication. Built with Node.js, Express, and React.',
    technologies: ['React', 'Node.js', 'WebSocket', 'Tailwind CSS'],
    link: 'https://github.com/AstaStaria203',
  },
  {
    title: 'E-commerce API Backend',
    description: 'A high-performance RESTful API for an e-commerce platform, featuring product catalog, user management, and order processing capabilities.',
    technologies: ['Python (Django)', 'PostgreSQL', 'Docker', 'JWT'],
    link: 'https://github.com/AstaStaria203',
  },
  {
    title: 'AI-Powered Content Generator',
    description: 'A tool that uses the Gemini API to generate creative content based on user prompts, featuring structured output parsing and search grounding.',
    technologies: ['React', 'Gemini API', 'TypeScript', 'State Management'],
    link: 'https://github.com/AstaStaria203',
  },
];

const skills = [
  { category: 'Frontend', list: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux', 'Vue.js'] },
  { category: 'Backend', list: ['Node.js (Express)', 'Python (Django/Flask)', 'Go', 'REST APIs', 'SQL/NoSQL'] },
  { category: 'DevOps & Tools', list: ['Docker', 'Kubernetes', 'AWS/GCP/Azure', 'Git', 'CI/CD', 'Terraform'] },
];

const NavItem = ({ text, onClick, theme }) => (
  <button
    onClick={onClick}
    className={`p-3 transition-colors duration-300 font-medium rounded-lg ${theme === 'light' ? 'text-gray-700 hover:text-indigo-600' : 'text-gray-300 hover:text-indigo-400'
      }`}
    aria-label={`Scroll to ${text} section`}
  >
    {text}
  </button>
);

// --- Main App Component ---

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  // Dark mode state initialized and stored in local storage
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  // Function to toggle between 'light' and 'dark' themes
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  // Refs for each section to handle scrolling and intersection observation
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = {
    home: homeRef,
    about: aboutRef,
    projects: projectsRef,
    contact: contactRef,
  };

  // Function to handle smooth scrolling
  const handleNavClick = (sectionId) => {
    const ref = sectionRefs[sectionId];
    if (ref && ref.current) {
      // Use scrollIntoView with smooth behavior for ease-in-out scroll
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false); // Close mobile menu after clicking
    }
  };

  // Intersection Observer for highlighting active section in navigation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const Hero = () => (
    <section ref={homeRef} id="home" className={`min-h-screen flex items-center justify-center text-center p-4 transition-colors duration-500 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
      }`}>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className={`text-6xl md:text-8xl font-extrabold leading-tight ${theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
          Hello, I'm <span className="text-indigo-600">Asta Staria</span>
        </h1>
        <p className={`text-xl md:text-2xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
          Full-Stack Developer | Focusing on building accessible, high-performance web applications with modern technologies.
        </p>
        <button
          onClick={() => handleNavClick('projects')}
          className="px-8 py-4 bg-indigo-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
        >
          View My Work
        </button>
      </div>
    </section>
  );

  const About = () => (
    <section ref={aboutRef} id="about" className={`py-20 px-4 transition-colors duration-500 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'
      }`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-12 border-b-4 border-indigo-500 inline-block mx-auto pb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className={`space-y-6 text-lg ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
            <p>
              I am a passionate software developer with over five years of professional experience, specializing in the JavaScript ecosystem, particularly React and Node.js. My journey began with a curiosity for how things work, evolving into a dedication to building clean, scalable, and delightful user experiences.
            </p>
            <p>
              Beyond the code, I thrive in collaborative environments, advocating for best practices like test-driven development and continuous integration. I believe that technology should solve real-world problems efficiently and elegantly.
            </p>
            <p>
              I am currently focusing on cloud-native application development and exploring the potential of AI/LLMs to enhance developer productivity and application features.
            </p>
          </div>
          <div className="space-y-6">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category} className={`p-6 rounded-xl shadow-inner ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'
                }`}>
                <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'
                  }`}>{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.list.map((skill) => (
                    <span
                      key={skill}
                      className={`px-4 py-1 text-sm font-medium rounded-full shadow-md transition duration-200 ${theme === 'light'
                        ? 'bg-white border border-indigo-200 text-gray-800 hover:bg-indigo-50'
                        : 'bg-gray-800 border-indigo-600 text-gray-100 hover:bg-gray-900'
                        }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const ProjectCard = ({ project, theme }) => (
    <div className={`p-6 rounded-xl shadow-2xl transition duration-500 transform hover:-translate-y-1 flex flex-col h-full ${theme === 'light'
      ? 'bg-white hover:shadow-indigo-300/50'
      : 'bg-gray-700 hover:shadow-indigo-700/50'
      }`}>
      <h3 className={`text-2xl font-bold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>{project.title}</h3>
      <p className={`mb-4 flex-grow ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'
        }`}>{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span key={tech} className={`px-3 py-1 text-xs font-semibold rounded-lg ${theme === 'light' ? 'bg-indigo-100 text-indigo-700' : 'bg-indigo-900 text-indigo-300'
            }`}>
            {tech}
          </span>
        ))}
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-auto inline-flex items-center font-medium transition-colors ${theme === 'light' ? 'text-indigo-600 hover:text-indigo-800' : 'text-indigo-400 hover:text-indigo-300'
          }`}
      >
        View on GitHub
      </a>
    </div>
  );

  const Projects = () => (
    <section ref={projectsRef} id="projects" className={`py-20 px-4 transition-colors duration-500 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
      }`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-12 border-b-4 border-indigo-500 inline-block mx-auto pb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
          Featured Projects
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} theme={theme} />
          ))}
        </div>
        <p className={`text-center text-lg mt-12 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
          Find more of my work and contributions on my official GitHub profile.
        </p>
      </div>
    </section>
  );

  const Contact = () => (
    <section ref={contactRef} id="contact" className={`py-20 px-4 transition-colors duration-500 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'
      }`}>
      <div className="max-w-xl mx-auto text-center">
        <h2 className={`text-4xl font-bold mb-6 border-b-4 border-indigo-500 inline-block mx-auto pb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
          Get In Touch
        </h2>
        <p className={`text-xl mb-10 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
          I'm currently available for freelance projects and new opportunities. Feel free to send me a message!
        </p>
        <a
          href="mailto:nadasharaf203@gmail.com"
          className="px-10 py-4 bg-indigo-600 text-white font-bold text-xl rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105 flex items-center justify-center mx-auto w-full md:w-auto"
        >
          Say Hello
        </a>
        <div className={`mt-8 pt-6 border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-600'
          }`}>
          <p className={`text-md ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>
            Connect with me on social media:
          </p>
          <a
            href="https://github.com/AstaStaria203"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block mt-4 transition-colors text-lg font-semibold ${theme === 'light' ? 'text-gray-700 hover:text-indigo-600' : 'text-gray-300 hover:text-indigo-400'
              }`}
            aria-label="GitHub Profile Link"
          >
            GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );

  const Header = () => (
    <header className={`sticky top-0 z-50 backdrop-blur-sm shadow-md transition-colors duration-500 ${theme === 'light' ? 'bg-white/95' : 'bg-gray-900/95 shadow-lg'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Main Logo/Title */}
          <div className="flex items-center">
            <span className={`ml-2 text-xl font-bold ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'
              }`}>Asta Staria Dev</span>
          </div>

          {/* Desktop Navigation */}
          <div className='flex items-center space-x-4'>
            <nav className="hidden md:flex space-x-1">
              <NavItem text="Home" onClick={() => handleNavClick('home')} theme={theme} />
              <NavItem text="About" onClick={() => handleNavClick('about')} theme={theme} />
              <NavItem text="Projects" onClick={() => handleNavClick('projects')} theme={theme} />
              <NavItem text="Contact" onClick={() => handleNavClick('contact')} theme={theme} />
            </nav>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`px-3 py-1 text-sm font-semibold rounded-full transition duration-300 ${theme === 'light'
                ? 'border border-indigo-500 text-indigo-600 hover:bg-indigo-50'
                : 'border border-indigo-300 text-indigo-300 hover:bg-gray-800'
                }`}
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 rounded-lg transition-colors font-semibold ${theme === 'light' ? 'text-gray-600 hover:text-indigo-600' : 'text-gray-300 hover:text-indigo-400'
                }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className={`flex flex-col p-2 space-y-1 shadow-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-800'
          }`}>
          <NavItem text="Home" onClick={() => handleNavClick('home')} theme={theme} />
          <NavItem text="About" onClick={() => handleNavClick('about')} theme={theme} />
          <NavItem text="Projects" onClick={() => handleNavClick('projects')} theme={theme} />
          <NavItem text="Contact" onClick={() => handleNavClick('contact')} theme={theme} />
        </div>
      </div>
    </header>
  );

  return (
    // Removed the 'dark' class application here, as styling is now handled by ternary operators
    <div style={{ scrollBehavior: 'smooth' }} className="min-h-screen font-inter">
      <style>{`
        /* Apply smooth scroll behavior globally */
        html {
          scroll-behavior: smooth;
        }

        /* Utility class for mobile menu transition */
        .transition-max-height {
          transition-property: max-height;
        }
      `}</style>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      {/* Footer remains dark, regardless of theme */}
      <footer className="bg-gray-800 text-white p-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Asta Staria All rights reserved.</p>
        <p className="text-xs mt-1 text-gray-400">Built with React and Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default App;