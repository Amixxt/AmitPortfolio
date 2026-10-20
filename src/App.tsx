import { type FormEvent, useEffect, useState } from "react"

const projects = [
  {
    number: "01",
    title: "Campus Connect",
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

const NotFound = () => (
  <main className="not-found">
    <a className="not-found-brand" href="/" aria-label="Amit's portfolio, home">
      AM<span>IT</span>
    </a>
    <div>
      <p className="eyebrow">Error / 404</p>
      <h1>
        Lost in the
        <br />
        <em>source.</em>
      </h1>
      <p>
        This route does not exist. The code is fine—you’ve just wandered beyond
        the build.
      </p>
      <a className="not-found-link" href="/">
        Return home <Arrow diagonal />
      </a>
    </div>
    <span className="not-found-code">404</span>
  </main>
)

const ProjectPreview = ({ index, title }: { index: number title: string }) => (
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
        <aside>
          <strong>CC</strong>
          <span className="active" />
          <span />
          <span />
          <span />
        </aside>
        <div className="campus-main">
          <p>Good morning, Amit</p>
          <h4>
            What’s happening
            <br />
            on campus?
          </h4>
          <div className="campus-stats">
            <article>
              <span>Upcoming</span>
              <strong>08</strong>
            </article>
            <article>
              <span>Communities</span>
              <strong>24</strong>
            </article>
          </div>
          <div className="campus-event">
            <span>Today · 4:30 PM</span>
            <strong>Developer Meetup</strong>
          </div>
        </div>
      </div>
    )}

    {index === 1 && (
      <div className="focus-ui">
        <div className="focus-nav">
          <strong>focus/flow</strong>
          <span>Dashboard&nbsp;&nbsp; Sessions</span>
        </div>
        <div className="focus-content">
          <p>Deep work session</p>
          <div className="timer-ring">
            <strong>48:12</strong>
            <span>FOCUS</span>
          </div>
          <div className="focus-actions">
            <span>Pause</span>
            <span>Finish session</span>
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
  const [contactStatus, setContactStatus] =
    useState<"idle" | "submitting" | "success" | "error">("idle")

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

    return () => {
      revealObserver.disconnect()
      window.removeEventListener("scroll", updateProgress)
    }
  }, [])

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    const cursor = document.querySelector<HTMLElement>(".cursor")
    const follower = document.querySelector<HTMLElement>(".cursor-follower")
    if (!cursor || !follower) return

    const move = (event: MouseEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      follower.animate(
        { transform: `translate3d(${event.clientX}px, ${event.clientY}px, 0)` },
        { duration: 450, fill: "forwards", easing: "cubic-bezier(.2,.8,.2,1)" },
      )
    }
    const grow = () => follower.classList.add("cursor-active")
    const shrink = () => follower.classList.remove("cursor-active")
    const interactive = document.querySelectorAll("a, button, .project-card")

    window.addEventListener("mousemove", move)
    interactive.forEach((item) => {
      item.addEventListener("mouseenter", grow)
      item.addEventListener("mouseleave", shrink)
    })

    return () => {
      window.removeEventListener("mousemove", move)
      interactive.forEach((item) => {
        item.removeEventListener("mouseenter", grow)
        item.removeEventListener("mouseleave", shrink)
      })
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

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

  if (
    window.location.pathname !== "/" &&
    window.location.pathname !== "/index.html"
  ) {
    return <NotFound />
  }

  return (
    <main>
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
            <span>Scroll to explore</span>
            <Arrow />
          </a>
        </div>
        <div className="orbit orbit-one">
          <span>Build · Learn · Debug · Repeat · </span>
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

        <div className="projects">
          {projects.map((project, index) => (
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
            href="https://github.com/Amixxt/Resume"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              View my résumé
              <small>GitHub-hosted · opens in a new tab</small>
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
                  <a href="mailto:hydranarcoo@gmail.com">
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
            <a href="mailto:hydranarcoo@gmail.com">Email</a>
          </div>
          <a href="#top">Back to top ↑</a>
        </footer>
      </section>
    </main>
  )
}
