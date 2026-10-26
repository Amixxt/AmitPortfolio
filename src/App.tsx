import { type FormEvent, useEffect, useState, useRef } from "react"

const projects = [
  {
    number: "01",
    title: "Campus Connect",
    category: "fullstack",
    type: "React · Node.js · PostgreSQL",
    year: "2025",
    problem:
      "Campus events, updates, and communities are often scattered across disconnected channels.",
    built:
      "A full-stack campus hub for discovering events, communities, and timely student updates.",
    outcome:
      "Creates one focused place for students to find opportunities and participate on campus.",
    liveUrl: null,
    repoUrl: null,
  },
  {
    number: "02",
    title: "Focus Flow",
    category: "frontend",
    type: "TypeScript · REST API · Firebase",
    year: "2025",
    problem:
      "Distractions make consistent deep-work sessions difficult to plan and measure.",
    built:
      "A typed focus timer with session controls, progress tracking, and a Firebase-backed workflow.",
    outcome:
      "Turns individual focus sessions into clear, visible weekly progress.",
    liveUrl: null,
    repoUrl: "https://github.com/wiroxa/CivicGrid",
  },
  {
    number: "03",
    title: "Vision AI",
    category: "ai",
    type: "Python · OpenCV · Machine Learning",
    year: "2024",
    problem:
      "Manually reviewing visual input makes real-time object detection slow and difficult to scale.",
    built:
      "An OpenCV and machine-learning prototype that labels detections with confidence feedback.",
    outcome:
      "Makes live inference results easier to inspect through a focused monitoring interface.",
    liveUrl: null,
    repoUrl: "https://github.com/wiroxa/CivicGrid",
  },
  {
    number: "04",
    title: "Algo Visualizer",
    category: "algo",
    type: "JavaScript · DSA · Canvas API",
    year: "2023",
    problem:
      "Sorting algorithms can feel abstract when learners only see the final output.",
    built:
      "An interactive Canvas visualizer that exposes each comparison and sorting step.",
    outcome:
      "Makes algorithm behavior observable instead of leaving it hidden inside code.",
    liveUrl: null,
    repoUrl: null,
  },
]

const projectFilters = [
  { id: "all", label: "All Projects" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "frontend", label: "Frontend & TS" },
  { id: "ai", label: "AI & ML" },
  { id: "algo", label: "Algorithms" },
]

const toolkit = [
  {
    number: "01",
    title: "Frontend",
    stack: "React · TypeScript · HTML · CSS",
    description:
      "Responsive, accessible interfaces built with reusable components, deliberate motion, and maintainable styling.",
  },
  {
    number: "02",
    title: "Backend",
    stack: "Node.js · Express · REST · SQL",
    description:
      "Practical APIs and data layers designed around clear contracts, reliable validation, and scalable application logic.",
  },
  {
    number: "03",
    title: "Core CS",
    stack: "DSA · OOP · DBMS · Operating Systems",
    description:
      "Strong fundamentals for reasoning about performance, data models, system behavior, and software architecture.",
  },
  {
    number: "04",
    title: "Tools",
    stack: "Git · GitHub · Linux · Figma",
    description:
      "A focused workflow for version control, collaboration, rapid prototyping, debugging, and shipping polished work.",
  },
]

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => (
  <svg
    aria-hidden="true"
    className={diagonal ? "arrow arrow-diagonal" : "arrow"}
    viewBox="0 0 24 24"
  >
    <path d={diagonal ? "M5 19 19 5M8 5h11v11" : "M4 12h16m-6-6 6 6-6 6"} />
  </svg>
)

const Check = () => (
  <svg aria-hidden="true" className="check" viewBox="0 0 24 24">
    <path d="m5 12 4 4L19 6" />
  </svg>
)

const ProjectPreview = ({ index, title }: { index: number; title: string }) => (
  <div
    className={`product-preview preview-${index + 1}`}
    role="img"
    aria-label={`${title} interface preview`}
  >
    <div className="browser-bar">
      <div className="browser-dots">
        <span />
        <span />
        <span />
      </div>
      <span className="browser-address">
        {title.toLowerCase().replaceAll(" ", "")}.app
      </span>
      <span className="browser-menu">•••</span>
    </div>

    {index === 0 && (
      <div className="campus-ui">
        <div className="campus-hero">
          <div>
            <span>COMMUNITY PULSE</span>
            <strong>Design Jam '25</strong>
          </div>
          <button type="button">Join</button>
        </div>
        <div className="campus-grid">
          <div>
            <span>42</span>
            <strong>Teams</strong>
          </div>
          <div>
            <span>360</span>
            <strong>RSVPs</strong>
          </div>
          <div>
            <span>12d</span>
            <strong>To build</strong>
          </div>
        </div>
      </div>
    )}

    {index === 1 && (
      <div className="focus-ui">
        <div className="focus-content">
          <div className="timer-ring">
            <strong>25:00</strong>
            <span>DEEP WORK</span>
          </div>
          <div className="focus-actions">
            <span>START</span>
            <span>RESET</span>
          </div>
          <div className="weekly-progress">
            <span>Weekly focus</span>
            <strong>14h 32m</strong>
            <i />
          </div>
        </div>
      </div>
    )}

    {index === 2 && (
      <div className="vision-ui">
        <div className="vision-grid" />
        <div className="scan-line" />
        <div className="detect-box detect-one">
          <span>PERSON · 98%</span>
        </div>
        <div className="detect-box detect-two">
          <span>DEVICE · 94%</span>
        </div>
        <div className="vision-status">
          <i /> LIVE INFERENCE <strong>32 FPS</strong>
        </div>
      </div>
    )}

    {index === 3 && (
      <div className="algo-ui">
        <div className="algo-header">
          <strong>Merge Sort</strong>
          <span>O(n log n)</span>
        </div>
        <div className="algo-bars" aria-hidden="true">
          {[32, 54, 42, 78, 61, 88, 48, 70, 95, 57, 82, 67].map(
            (height, barIndex) => (
              <i
                key={height}
                className={barIndex === 5 || barIndex === 8 ? "sorting" : ""}
                style={{ height: `${height}%` }}
              />
            ),
          )}
        </div>
        <div className="algo-controls">
          <span>Step 24 / 48</span>
          <strong>▶</strong>
          <span>1.0×</span>
        </div>
      </div>
    )}
  </div>
)

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openToolkit, setOpenToolkit] = useState<string | null>("01")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [contactStatus, setContactStatus] =
    useState<"idle" | "submitting" | "success" | "error">("idle")

  // Interactive AI Assistant State
  const [aiWidgetOpen, setAiWidgetOpen] = useState(false)
  const [aiMessages, setAiMessages] = useState<
    Array<{ sender: "bot" | "user"; text: string }>
  >([
    {
      sender: "bot",
      text: "Hello! I am Amit's portfolio assistant. Ask me about his technical skills, projects, or internship availability!",
    },
  ])
  const [aiInput, setAiInput] = useState("")
  const [isAiTyping, setIsAiTyping] = useState(false)
  const chatBottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [aiMessages, isAiTyping])

  useEffect(() => {
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? window.scrollY / total : 0)
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible")
        })
      },
      { threshold: 0.12 },
    )

    document
      .querySelectorAll(".reveal")
      .forEach((element) => revealObserver.observe(element))
    window.addEventListener("scroll", updateProgress, { passive: true })
    updateProgress()

    const cursor = document.querySelector(".cursor") as HTMLElement | null
    const follower = document.querySelector(
      ".cursor-follower",
    ) as HTMLElement | null

    if (cursor && follower && window.matchMedia("(pointer: fine)").matches) {
      let mouseX = 0
      let mouseY = 0
      let followerX = 0
      let followerY = 0

      const move = (event: MouseEvent) => {
        mouseX = event.clientX
        mouseY = event.clientY
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }

      const animateFollower = () => {
        followerX += (mouseX - followerX) * 0.16
        followerY += (mouseY - followerY) * 0.16
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`
        requestAnimationFrame(animateFollower)
      }

      const grow = () => document.body.classList.add("cursor-grow")
      const shrink = () => document.body.classList.remove("cursor-grow")

      const handleMouseOver = (e: MouseEvent) => {
        const target = (e.target as HTMLElement | null)?.closest(
          "a, button, input, textarea, .service-row, .portfolio-ai-chips button, .portfolio-ai-close-btn, .project-filter-pill, .nav-ai-btn",
        )
        if (target) grow()
      }
      const handleMouseOut = (e: MouseEvent) => {
        const target = (e.target as HTMLElement | null)?.closest(
          "a, button, input, textarea, .service-row, .portfolio-ai-chips button, .portfolio-ai-close-btn, .project-filter-pill, .nav-ai-btn",
        )
        if (target) shrink()
      }

      window.addEventListener("mousemove", move)
      window.addEventListener("mouseover", handleMouseOver)
      window.addEventListener("mouseout", handleMouseOut)
      requestAnimationFrame(animateFollower)

      return () => {
        window.removeEventListener("scroll", updateProgress)
        revealObserver.disconnect()
        window.removeEventListener("mousemove", move)
        window.removeEventListener("mouseover", handleMouseOver)
        window.removeEventListener("mouseout", handleMouseOut)
      }
    }

    return () => {
      window.removeEventListener("scroll", updateProgress)
      revealObserver.disconnect()
    }
  }, [])

  // Interactive Particle Canvas Background
  useEffect(() => {
    const canvas = document.getElementById(
      "portfolio-bg-canvas",
    ) as HTMLCanvasElement | null
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const particleCount = Math.min(Math.floor((width * height) / 22000), 45)
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      r: number
    }> = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.5 + 1,
      })
    }

    let animId: number
    const render = () => {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(212, 255, 0, 0.45)"
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 110) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(212, 255, 0, ${(1 - d / 110) * 0.12})`
            ctx.lineWidth = 0.65
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(render)
    }
    render()

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", onResize, { passive: true })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  // Authentic System Prompt for Amit Kushwaha
  const AMIT_AI_SYSTEM_PROMPT = `You are Amit's friendly personal AI assistant on his portfolio website (amixtportfolio.vercel.app).
Amit Kushwaha is a 3rd-year B.Tech Computer Science & Engineering student at Global Institute of Engineering, Jabalpur (expected graduation: 2026). He completed his 12th standard (Science) from Green Valley Public School, Jabalpur.
- Technical Skills:
  * Languages: C, C++, TypeScript, JavaScript (ES6+), Python
  * Frontend: React, Next.js, HTML5, modern CSS3, Tailwind CSS
  * Backend & Databases: Node.js, Express, REST APIs, SQL, PostgreSQL, Firebase
  * Core Fundamentals: Data Structures & Algorithms, Object-Oriented Programming (OOP), Git/GitHub
- Featured Projects:
  1. Campus Connect: Full-stack campus hub built with React, Node.js & PostgreSQL.
  2. Focus Flow: Typed productivity session timer with TypeScript & Firebase.
  3. Vision AI: Computer vision prototype with Python & OpenCV with real-time confidence feedback.
  4. Algo Visualizer: Interactive Canvas-based sorting algorithm explorer.
  5. Interactive ATS Resume: Accessible, responsive portfolio and resume engine.
- Internship & Opportunities: Actively seeking Software Engineering and Full-Stack Development internships (open for remote and on-site opportunities).
- Contact Info: Email: hydranarcoo@gmail.com, Phone: +91 8109315812, Location: Jabalpur, Madhya Pradesh, India (PIN 482004), GitHub: github.com/Amixxt, LinkedIn: linkedin.com/in/amixxt, Instagram: @why_amixt
- Guidelines:
  * Respond warmly, politely, and enthusiastically in 2 to 3 concise sentences.
  * Adapt to the user's language: if greeted or asked in Hindi or Hinglish (e.g., "kaise ho", "kya chal raha hai", "batao", "kya skills hai"), reply warmly in natural Hinglish/Hindi. If asked in English, reply in crisp English.
  * Stick strictly to Amit's true background and skills.`;

  // Local Fallback Knowledge Base Engine
  const generateAiAnswer = (query: string): string => {
    const q = query.toLowerCase().trim()
    if (
      q.includes("skill") ||
      q.includes("stack") ||
      q.includes("tech") ||
      q.includes("language") ||
      q.includes("c++")
    ) {
      return "Amit's core technical competencies include:\n• Primary Languages: C++, TypeScript, JavaScript, Python\n• Frontend: React, Next.js, HTML5, CSS3, Tailwind\n• Backend & Databases: Node.js, Express, REST APIs, SQL, PostgreSQL, Firebase\n• CS Fundamentals: Data Structures & Algorithms, Object-Oriented Programming (OOP), Git/GitHub."
    }
    if (
      q.includes("project") ||
      q.includes("work") ||
      q.includes("built") ||
      q.includes("vision") ||
      q.includes("campus") ||
      q.includes("focus")
    ) {
      return "Here are Amit's key featured projects:\n1. Campus Connect — Full-stack campus hub built with React, Node.js & PostgreSQL.\n2. Focus Flow — Typed productivity session timer with TypeScript & Firebase.\n3. Vision AI — Computer vision prototype with Python & OpenCV with real-time confidence feedback.\n4. Algo Visualizer — Interactive Canvas-based sorting algorithm explorer."
    }
    if (
      q.includes("college") ||
      q.includes("education") ||
      q.includes("degree") ||
      q.includes("btech") ||
      q.includes("b.tech")
    ) {
      return "Amit is currently in his 3rd year pursuing B.Tech in Computer Science & Engineering at Global Institute of Engineering, Jabalpur (expected graduation in 2026). He completed his 12th science education from Green Valley Public School."
    }
    if (
      q.includes("intern") ||
      q.includes("hire") ||
      q.includes("job") ||
      q.includes("role") ||
      q.includes("available")
    ) {
      return "Yes! Amit is actively open for Software Engineering and Full-Stack Development internships. He brings solid fundamentals in C++, problem solving, clean frontend engineering, and rapid learning ability to tech teams."
    }
    if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("phone") ||
      q.includes("reach") ||
      q.includes("call")
    ) {
      return "You can get in touch with Amit directly:\n• Email: hydranarcoo@gmail.com\n• Phone: +91 8109315812\n• GitHub: github.com/Amixxt\n• LinkedIn: linkedin.com/in/amixxt\n• Instagram: @why_amixt"
    }
    if (q.includes("location") || q.includes("where") || q.includes("city") || q.includes("jabalpur")) {
      return "Amit is based in Jabalpur, Madhya Pradesh, India (482004). He is available for remote opportunities as well as on-site internship roles."
    }
    if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("namaste") || q.includes("kaise")) {
      return "Hey! Great to connect with you. I can assist you with details regarding Amit's projects, tech stack, academic credentials, or internship availability. What would you like to know?"
    }
    return "Amit is a 3rd-year CSE student building thoughtful full-stack applications and AI experiments. Feel free to ask about his skills, projects, or reach out to him directly at hydranarcoo@gmail.com!"
  }

  // Real-time AI Fetch with Timeout & Fallback
  const fetchRealAiResponse = async (userQuery: string): Promise<string> => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 6500)

    const fullPrompt = `${AMIT_AI_SYSTEM_PROMPT}\n\nUser Question: ${userQuery}\n\nHelpful, concise answer as Amit's Assistant:`
    const url = `https://text.pollinations.ai/${encodeURIComponent(fullPrompt)}`

    try {
      const response = await fetch(url, {
        method: "GET",
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const text = await response.text()
      if (!text || !text.trim()) throw new Error("Empty response")
      return text.trim()
    } catch (err) {
      clearTimeout(timeoutId)
      console.warn("Real AI endpoint unavailable, using local knowledge engine:", err)
      return generateAiAnswer(userQuery)
    }
  }

  const handleAiSubmit = async (
    e?: FormEvent<HTMLFormElement>,
    customQuery?: string,
  ) => {
    if (e) e.preventDefault()
    const query = customQuery || aiInput
    if (!query.trim()) return

    const newMessages = [
      ...aiMessages,
      { sender: "user" as const, text: query },
    ]
    setAiMessages(newMessages)
    if (!customQuery) setAiInput("")
    setIsAiTyping(true)

    try {
      const botReply = await fetchRealAiResponse(query)
      setIsAiTyping(false)
      setAiMessages((prev) => [
        ...prev,
        { sender: "bot" as const, text: botReply },
      ])
    } catch {
      setIsAiTyping(false)
      const fallback = generateAiAnswer(query)
      setAiMessages((prev) => [
        ...prev,
        { sender: "bot" as const, text: fallback },
      ])
    }
  }
  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setContactStatus("submitting")

    try {
      const response = await fetch("https://formspree.io/f/mbgdwvlg", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })

      if (!response.ok) throw new Error("Form submission failed")

      form.reset()
      setContactStatus("success")
    } catch {
      setContactStatus("error")
    }
  }

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <main className="portfolio" id="top">
      {/* Interactive Particle Canvas */}
      <canvas
        id="portfolio-bg-canvas"
        className="portfolio-bg-canvas"
        aria-hidden="true"
      />

      <div className="cursor" />
      <div className="cursor-follower" />
      <div className="noise" />
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <nav className={`nav ${menuOpen ? "menu-active" : ""}`}>
        <a
          className="brand"
          href="#top"
          onClick={closeMenu}
          aria-label="Amit's computer science portfolio, home"
        >
          AM<span>IT</span>
        </a>
        <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <a href="#work" onClick={closeMenu}>
            Work
          </a>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
          <button
            type="button"
            className="nav-ai-btn"
            onClick={() => {
              closeMenu()
              setAiWidgetOpen(true)
            }}
            title="Ask Amit's AI Assistant"
          >
            <span className="sparkle">&#10022;</span> Ask AI
          </button>
        </div>
        <div className="availability">
          <span />
          Open to internships
        </div>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
        </button>
      </nav>

      <section className="hero" id="top">
        <div className="hero-kicker load-in">
          <span>Amit · Computer Science Student</span>
          <span>Developer · Problem solver</span>
        </div>
        <div className="hero-title" aria-label="Code with bite">
          <div className="title-line title-one">
            <span>C</span>
            <span>O</span>
            <span>D</span>
            <span>E</span>
          </div>
          <div className="title-line title-two">
            <span>W</span>
            <span>I</span>
            <span>T</span>
            <span>H</span>
            <em className="spark">*</em>
          </div>
          <div className="title-line title-three">
            <span>B</span>
            <span>I</span>
            <span>T</span>
            <span>E</span>
            <span className="period">.</span>
          </div>
        </div>
        <div className="hero-bottom load-in">
          <p>
            I turn ideas into useful, thoughtful software—learning fast,
            building in public, and always ready for the next hard problem.
          </p>
          <a
            href="#work"
            className="round-link"
            aria-label="Explore selected work"
          >
            <span>
              Explore work <Arrow diagonal />
            </span>
          </a>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>Building the future</span>
          <i>✦</i>
          <span>One commit at a time</span>
          <i>✦</i>
          <span>Building the future</span>
          <i>✦</i>
          <span>One commit at a time</span>
          <i>✦</i>
        </div>
      </div>

      <section className="work-section" id="work">
        <header className="section-heading reveal">
          <p className="eyebrow">(01) Selected work</p>
          <h2>
            Built to solve
            <br />
            problems.
          </h2>
          <p className="section-note">
            Full-stack builds, ML experiments, and ideas turned into working
            code.
          </p>
        </header>

        {/* Interactive Category Filter Tabs */}
        <div className="project-filter-tabs reveal">
          {projectFilters.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`project-filter-pill ${selectedCategory === tab.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="projects">
          {filteredProjects.map((project, index) => (
            <article
              className={`project-card reveal project-${index + 1}`}
              key={project.title}
            >
              <div className="project-image">
                <ProjectPreview index={index} title={project.title} />
                <div className="view-project">
                  <span>UI preview</span>
                </div>
              </div>
              <div className="project-meta">
                <span>{project.number}</span>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.type}</p>
                </div>
                <span>{project.year}</span>
              </div>
              <div className="project-proof">
                <p>
                  <span>Problem</span>
                  {project.problem}
                </p>
                <p>
                  <span>Built</span>
                  {project.built}
                </p>
                <p>
                  <span>Outcome</span>
                  {project.outcome}
                </p>
              </div>
              <div className="project-actions">
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Live demo <Arrow diagonal />
                  </a>
                ) : (
                  <span
                    className="project-action-disabled"
                    aria-disabled="true"
                  >
                    Demo unavailable
                  </span>
                )}
                {project.repoUrl ? (
                  <a href={project.repoUrl} target="_blank" rel="noreferrer">
                    GitHub repository <Arrow diagonal />
                  </a>
                ) : (
                  <span
                    className="project-action-disabled"
                    aria-disabled="true"
                  >
                    Repository unavailable
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-sticky reveal">
          <p className="eyebrow">(02) The plot</p>
          <div className="portrait-wrap">
            <img
              src="/amit-portrait.webp"
              alt="Software developer working at a computer under colorful lights"
            />
            <span className="portrait-label">Currently compiling...</span>
          </div>
        </div>

        <div className="about-copy reveal">
          <h2>
            Curious mind.
            <br />
            <em>Clean</em> code.
          </h2>
          <p className="about-lead">
            I’m Amit, a CSE student who loves turning complex problems into
            simple, human-friendly products.
          </p>
          <div className="about-detail">
            <p>
              My foundation spans data structures, algorithms, databases,
              operating systems, and object-oriented programming—with hands-on
              experience shipping web applications.
            </p>
            <p>
              I’m looking for internships and collaborations where I can
              contribute, learn from strong teams, and build technology that
              matters.
            </p>
          </div>
          <div className="student-facts">
            <div>
              <span>Degree</span>
              <strong>Computer Science &amp; Engineering</strong>
            </div>
            <div>
              <span>Focus</span>
              <strong>Full-stack development &amp; AI</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>Open to internships &amp; collaborations</strong>
            </div>
          </div>
          <a
            className="text-link resume-link"
            href="https://resume-zeta-umber-36.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              View my résumé
              <small>Interactive digital resume · opens in a new tab</small>
            </span>
            <Arrow diagonal />
          </a>
        </div>
      </section>

      <section className="services-section">
        <div className="services-intro reveal">
          <p className="eyebrow">(03) My toolkit</p>
          <h2>
            Strong basics.
            <br />
            <em>Always learning.</em>
          </h2>
        </div>
        <div className="service-list">
          {toolkit.map(({ number, title, stack, description }) => {
            const isOpen = openToolkit === number
            return (
              <div
                className={`service-item reveal ${isOpen ? "is-open" : ""}`}
                key={number}
              >
                <button
                  className="service-row"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`toolkit-detail-${number}`}
                  onClick={() =>
                    setOpenToolkit((current) =>
                      current === number ? null : number,
                    )
                  }
                >
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{stack}</p>
                  <Arrow diagonal />
                </button>
                <div className="service-detail" id={`toolkit-detail-${number}`}>
                  <p>{description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-top reveal">
          <p className="eyebrow">(04) Let’s connect</p>
          <p>
            Internship, project, or just a good idea?
            <br />
            My inbox is open.
          </p>
        </div>
        <a className="contact-link reveal" href="#contact-form">
          <span>LET’S</span>
          <span>BUILD</span>
          <span className="contact-arrow">
            <Arrow diagonal />
          </span>
        </a>
        <div className="contact-form-wrap reveal" id="contact-form">
          <div className="contact-form-intro">
            <p className="eyebrow">Start a conversation</p>
            <h3>
              Tell me what you’re
              <br />
              thinking about.
            </h3>
            <p>
              Share the opportunity, project, or problem. I usually reply by
              email.
            </p>
          </div>
          <form
            className="contact-form"
            onSubmit={handleContactSubmit}
            onChange={() => {
              if (contactStatus !== "submitting") setContactStatus("idle")
            }}
          >
            <label>
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
              <small>Enter a valid email so I can reply.</small>
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" rows={4} required />
            </label>
            <button type="submit" disabled={contactStatus === "submitting"}>
              {contactStatus === "submitting" ? "Sending…" : "Send message"}
              <Arrow diagonal />
            </button>
            <div
              className={`form-status form-status-${contactStatus}`}
              role={contactStatus === "error" ? "alert" : "status"}
              aria-live="polite"
            >
              {contactStatus === "success" && (
                <>
                  <Check />
                  <span>
                    <strong>Message sent.</strong>
                    Thanks—your note is on its way.
                  </span>
                </>
              )}
              {contactStatus === "error" && (
                <span>
                  <strong>Something went wrong.</strong>
                  Try again or email{" "}
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=hydranarcoo@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    hydranarcoo@gmail.com
                  </a>
                  .
                </span>
              )}
            </div>
          </form>
        </div>
        <footer>
          <p>© 2025 Amit</p>
          <div>
            <a
              href="https://github.com/Amixxt"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/amixxt"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/why_amixt/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=hydranarcoo@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              Email
            </a>
          </div>
          <a href="#top">Back to top ↑</a>
        </footer>
      </section>

      {/* Floating AI Assistant Launcher Button */}
      <button
        type="button"
        className={`portfolio-floating-ai-btn ${scrollProgress > 0.05 ? "is-visible" : ""}`}
        onClick={() => setAiWidgetOpen((open) => !open)}
        title="Chat with Amit's AI Assistant"
        aria-label="Open AI Assistant"
      >
        <span className="ai-pulse-dot" />
        <span className="ai-icon">✦</span>
        <span className="ai-btn-text">Ask Amit AI</span>
      </button>

      {/* Interactive AI Assistant Modal Drawer */}
      <div
        className={`portfolio-ai-drawer-overlay ${aiWidgetOpen ? "is-open" : ""}`}
        onClick={() => setAiWidgetOpen(false)}
      >
        <div
          className="portfolio-ai-drawer"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="Amit's AI Assistant"
        >
          <div className="portfolio-ai-header">
            <div className="portfolio-ai-header-left">
              <span className="portfolio-ai-badge">✦</span>
              <div>
                <h4>Amit's Assistant</h4>
                <p>
                  <span className="live-dot" /> Online · 3rd Year B.Tech CSE
                </p>
              </div>
            </div>
            <button
              type="button"
              className="portfolio-ai-close-btn"
              onClick={() => setAiWidgetOpen(false)}
              aria-label="Close Assistant"
            >
              ✕
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="portfolio-ai-chips">
            <button
              type="button"
              onClick={() =>
                handleAiSubmit(undefined, "What are Amit's main skills?")
              }
            >
              ⚡ Skills
            </button>
            <button
              type="button"
              onClick={() =>
                handleAiSubmit(undefined, "Tell me about your projects")
              }
            >
              💻 Projects
            </button>
            <button
              type="button"
              onClick={() =>
                handleAiSubmit(
                  undefined,
                  "Are you available for internships?",
                )
              }
            >
              🎯 Internship
            </button>
            <button
              type="button"
              onClick={() =>
                handleAiSubmit(undefined, "How can I contact Amit?")
              }
            >
              📬 Contact
            </button>
          </div>

          {/* Chat Messages */}
          <div className="portfolio-ai-messages">
            {aiMessages.map((msg, i) => (
              <div
                key={i}
                className={`portfolio-ai-msg ${msg.sender === "user" ? "msg-user" : "msg-bot"}`}
              >
                <div className="msg-content">{msg.text}</div>
              </div>
            ))}
            {isAiTyping && (
              <div className="portfolio-ai-msg msg-bot">
                <div className="msg-content msg-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Form */}
          <form
            className="portfolio-ai-input-form"
            onSubmit={(e) => handleAiSubmit(e)}
          >
            <input
              type="text"
              placeholder="Ask about Amit's skills, projects..."
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              autoFocus
            />
            <button type="submit" aria-label="Send">
              <Arrow diagonal />
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
