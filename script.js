/**
 * @typedef {Object} NavItem
 * @property {string} label - Text shown in the top navigation.
 * @property {string} targetId - Section id the nav link scrolls to.
 */

/**
 * @typedef {Object} ActionLink
 * @property {string} label - Accessible text shown for the link.
 * @property {string} href - Destination URL or local file path.
 * @property {string} [variant] - Optional visual style name.
 * @property {string} [icon] - Optional icon asset path.
 * @property {boolean} [external] - Opens the link in a new tab when true.
 */

/**
 * @typedef {Object} Project
 * @property {string} title - Project or portfolio item name.
 * @property {string} description - Short explanation of the work.
 * @property {string} [image] - Optional project image or logo path.
 * @property {string} [imageFallback] - Optional backup image path.
 * @property {ActionLink[]} links - Related project links.
 */

/**
 * @typedef {Object} Technology
 * @property {string} name - Display name for the technology.
 * @property {string} image - Technology logo path.
 * @property {string} category - Short category label.
 */

/**
 * @typedef {Object} Certificate
 * @property {string} title - Certificate name.
 * @property {string} description - Short certificate summary.
 * @property {ActionLink[]} [links] - Related certificate links.
 */

/**
 * @typedef {Object} CertificateGroup
 * @property {string} issuer - Organization that issued the certificates.
 * @property {Certificate[]} items - Certificates from this issuer.
 */

/**
 * Portfolio content kept in one place so adding new projects, tools, or links
 * does not require editing the page markup.
 */
const portfolio = {
  navItems: [
    { label: "Home", targetId: "home" },
    { label: "About", targetId: "about" },
    { label: "Projects", targetId: "projects" },
    { label: "Technologies", targetId: "technologies" },
    { label: "Certificates", targetId: "certificates" },
    { label: "Contact", targetId: "contact" },
  ],
  profile: {
    summary:
      "Computer Science student at UC San Diego and aspiring full-stack developer with a foundation in Java, C, and interactive programming.",
    actions: [
      {
        label: "View Resume",
        href: "Resume.pdf",
        variant: "primary",
        external: true,
      },
      {
        label: "Email Me",
        href: "mailto:jvillan314@gmail.com",
        variant: "secondary",
      },
    ],
  },
  about: [
    "I am a Computer Science student at UC San Diego building a foundation in software engineering, systems programming, and practical application development.",
    "My current work focuses on strengthening fundamentals in Java and C while continuing to explore full-stack development, developer tools, and clean project organization.",
  ],
  projects: [
    {
      title: "WatchTower",
      description:
        "A lightweight observability platform for web apps with a browser SDK, Node.js backend, Supabase/Postgres persistence, and a Clerk-authenticated real-time dashboard.",
      image: "project_images/watchtower-logo.png",
      imageFallback:
        "https://raw.githubusercontent.com/cse110-sp26-group09/Watchtower-Course-Project/main/src/frontend/assets/logos/watchtower-logo.png",
      links: [
        {
          label: "GitHub Repository",
          href: "https://github.com/cse110-sp26-group09/Watchtower-Course-Project",
          external: true,
        },
      ],
    },
    {
      title: "UC San Diego Coursework",
      description:
        "A collection of coursework materials and programming assignments. Access may require share permissions.",
      image: "project_images/ucsd-logo.svg",
      links: [
        {
          label: "Coursework Drive",
          href: "https://drive.google.com/drive/folders/1fKkb8sXhfEoYtyngLy5WPq7jSGgxxUzF?usp=sharing",
          external: true,
        },
      ],
    },
    {
      title: "OpenProcessing Sketches",
      description:
        "Interactive programming sketches created during high school using p5.js and creative coding concepts.",
      image: "tech_images/p5 JS.svg",
      links: [
        {
          label: "OpenProcessing Profile",
          href: "https://openprocessing.org/user/236698/#sketches",
          external: true,
        },
      ],
    },
  ],
  technologies: [
    { name: "Java", image: "tech_images/Java.svg", category: "Language" },
    { name: "C", image: "tech_images/C.svg", category: "Language" },
    { name: "p5.js", image: "tech_images/p5 JS.svg", category: "Creative Coding" },
    { name: "Swift", image: "tech_images/Swift.svg", category: "Language" },
    { name: "Git", image: "tech_images/Git.svg", category: "Version Control" },
    {
      name: "VS Code",
      image: "tech_images/Visual Studio Code (VS Code).svg",
      category: "Editor",
    },
    { name: "Bash", image: "tech_images/Bash.svg", category: "Shell" },
  ],
  certificates: [
    {
      issuer: "CodeSignal",
      items: [
        {
          title: "Comprehensive Introduction to HTML for Beginners",
          description:
            "Certificate of Achievement for a beginner HTML path covering structured webpages, images, links, tables, and navigation.",
          links: [
            {
              label: "Course Path",
              href: "https://codesignal.com/learn/paths/comprehensive-introduction-to-html-for-beginners",
              external: true,
            },
          ],
        },
      ],
    },
  ],
  contact: {
    copy:
      "I am open to software projects, internship opportunities, and conversations about computer science, full-stack development, and technical growth.",
    actions: [
      {
        label: "GitHub",
        href: "https://github.com/JamesVillanueva-Dev",
        icon: "Contact_Icons/GitHub.svg",
        external: true,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/jamesuvillanueva/",
        icon: "Contact_Icons/LinkedIn.svg",
        external: true,
      },
      {
        label: "Email",
        href: "mailto:jvillan314@gmail.com",
      },
    ],
  },
};

/**
 * Queries the document for a required element.
 *
 * @param {string} selector - CSS selector used to locate the element.
 * @returns {Element} Matching DOM element.
 * @throws {Error} If the element cannot be found.
 */
function getElement(selector) {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`Missing required element: ${selector}`);
  }

  return element;
}

/**
 * Creates an anchor with shared external-link behavior.
 *
 * @param {ActionLink} link - Link content and destination.
 * @param {string} className - CSS class to apply.
 * @returns {HTMLAnchorElement} Configured anchor element.
 */
function createLink(link, className) {
  const anchor = document.createElement("a");
  anchor.className = className;
  anchor.href = link.href;
  anchor.textContent = link.label;

  if (link.href.startsWith("mailto:")) {
    anchor.dataset.email = link.href.replace("mailto:", "");
  }

  if (link.external) {
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
  }

  if (link.variant) {
    anchor.dataset.variant = link.variant;
  }

  return anchor;
}

/**
 * Renders the fixed top navigation and attaches smooth section scrolling.
 *
 * @param {NavItem[]} navItems - Ordered navigation entries.
 */
function renderNavigation(navItems) {
  const navList = getElement("[data-nav-links]");

  navItems.forEach((item) => {
    const listItem = document.createElement("li");
    const anchor = document.createElement("a");

    anchor.href = `#${item.targetId}`;
    anchor.textContent = item.label;
    anchor.dataset.targetId = item.targetId;
    listItem.append(anchor);
    navList.append(listItem);
  });
}

/**
 * Renders profile summary and primary hero actions.
 */
function renderProfile() {
  getElement("[data-profile-summary]").textContent = portfolio.profile.summary;

  const actions = getElement("[data-profile-actions]");
  portfolio.profile.actions.forEach((link) => {
    actions.append(createLink(link, "button-link"));
  });
}

/**
 * Renders about paragraphs from the content array.
 */
function renderAbout() {
  const about = getElement("[data-about-content]");

  portfolio.about.forEach((paragraph) => {
    const element = document.createElement("p");
    element.textContent = paragraph;
    about.append(element);
  });
}

/**
 * Renders the project cards.
 *
 * @param {Project[]} projects - Projects to show.
 */
function renderProjects(projects) {
  const projectList = getElement("[data-project-list]");

  projects.forEach((project) => {
    const article = document.createElement("article");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const links = document.createElement("div");

    article.className = "project-card";
    title.textContent = project.title;
    description.textContent = project.description;
    links.className = "inline-links";

    if (project.image) {
      const media = document.createElement("div");
      const image = document.createElement("img");

      article.classList.add("has-media");
      media.className = "project-card-media";
      image.addEventListener("error", () => {
        if (!project.imageFallback || image.dataset.fallbackApplied) {
          return;
        }

        image.dataset.fallbackApplied = "true";
        image.src = project.imageFallback;
      });
      image.src = project.image;
      image.alt = `${project.title} logo`;
      image.loading = "lazy";
      media.append(image);
      article.append(media);
    }

    project.links.forEach((link) => {
      links.append(createLink(link, "text-link"));
    });

    article.append(title, description, links);
    projectList.append(article);
  });
}

/**
 * Renders technology tiles with logo, name, and category.
 *
 * @param {Technology[]} technologies - Technologies to show.
 */
function renderTechnologies(technologies) {
  const technologyList = getElement("[data-technology-list]");

  technologies.forEach((technology) => {
    const item = document.createElement("article");
    const image = document.createElement("img");
    const copy = document.createElement("div");
    const name = document.createElement("h3");
    const category = document.createElement("p");

    item.className = "technology-card";
    image.src = technology.image;
    image.alt = `${technology.name} logo`;
    image.loading = "lazy";
    name.textContent = technology.name;
    category.textContent = technology.category;

    copy.append(name, category);
    item.append(image, copy);
    technologyList.append(item);
  });
}

/**
 * Renders certificates grouped by issuing organization.
 *
 * @param {CertificateGroup[]} certificateGroups - Certificates grouped by issuer.
 */
function renderCertificates(certificateGroups) {
  const certificateList = getElement("[data-certificate-list]");

  certificateGroups.forEach((group, index) => {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    const issuer = document.createElement("span");
    const count = document.createElement("span");
    const items = document.createElement("div");

    details.className = "certificate-group";
    details.open = index === 0;
    summary.className = "certificate-group-summary";
    issuer.textContent = group.issuer;
    count.textContent = `${group.items.length} certificate${
      group.items.length === 1 ? "" : "s"
    }`;
    count.className = "certificate-count";
    items.className = "certificate-items";

    summary.append(issuer, count);

    group.items.forEach((certificate) => {
      const item = document.createElement("article");
      const title = document.createElement("h3");
      const description = document.createElement("p");

      item.className = "certificate-card";
      title.textContent = certificate.title;
      description.textContent = certificate.description;
      item.append(title, description);

      if (certificate.links?.length) {
        const links = document.createElement("div");

        links.className = "inline-links";
        certificate.links.forEach((link) => {
          links.append(createLink(link, "text-link"));
        });
        item.append(links);
      }

      items.append(item);
    });

    details.append(summary, items);
    certificateList.append(details);
  });
}

/**
 * Renders contact copy and links.
 */
function renderContact() {
  const copy = getElement("[data-contact-copy]");
  const paragraph = document.createElement("p");
  const actions = getElement("[data-contact-actions]");

  paragraph.textContent = portfolio.contact.copy;
  copy.append(paragraph);

  portfolio.contact.actions.forEach((link) => {
    const anchor = createLink(link, link.icon ? "icon-link" : "button-link");

    if (link.icon) {
      const icon = document.createElement("img");
      icon.src = link.icon;
      icon.alt = "";
      icon.setAttribute("aria-hidden", "true");
      anchor.prepend(icon);
    }

    actions.append(anchor);
  });
}

/**
 * Toggles the mobile navigation menu.
 */
function setupMobileNavigation() {
  const button = getElement(".nav-toggle");
  const navList = getElement("[data-nav-links]");

  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    navList.classList.toggle("is-open", !expanded);
  });

  navList.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      button.setAttribute("aria-expanded", "false");
      navList.classList.remove("is-open");
    }
  });
}

/**
 * Highlights the nav item for the section nearest the top of the viewport.
 */
function setupActiveSectionTracking() {
  const navLinks = [...document.querySelectorAll("[data-target-id]")];
  const sections = navLinks
    .map((link) => document.getElementById(link.dataset.targetId ?? ""))
    .filter(Boolean);
  let trackingQueued = false;

  function setActiveLink(targetId) {
    navLinks.forEach((link) => {
      if (link.dataset.targetId === targetId) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function syncActiveSection() {
    const page = document.documentElement;
    const bottomThreshold = 2;
    const isAtBottom =
      window.scrollY + window.innerHeight >= page.scrollHeight - bottomThreshold;
    let activeSection = sections[0];

    if (isAtBottom) {
      activeSection = sections[sections.length - 1];
    } else {
      const marker = window.scrollY + window.innerHeight * 0.42;

      sections.forEach((section) => {
        if (section.offsetTop <= marker) {
          activeSection = section;
        }
      });
    }

    if (activeSection) {
      setActiveLink(activeSection.id);
    }

    trackingQueued = false;
  }

  function queueActiveSectionSync() {
    if (trackingQueued) {
      return;
    }

    trackingQueued = true;
    window.requestAnimationFrame(syncActiveSection);
  }

  window.addEventListener("scroll", queueActiveSectionSync, { passive: true });
  window.addEventListener("resize", queueActiveSectionSync);
  syncActiveSection();
}

/**
 * Copies text with the modern Clipboard API when available, then falls back to
 * a temporary input for browsers with stricter clipboard support.
 *
 * @param {string} text - Text to place on the clipboard.
 * @returns {Promise<boolean>} Whether the copy action completed.
 */
async function copyText(text) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const input = document.createElement("input");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.append(input);
  input.select();

  const copied = document.execCommand("copy");
  input.remove();

  return copied;
}

/**
 * Copies email addresses when mailto links are clicked so the button still has
 * a useful result when the visitor has no default mail app configured.
 */
function setupEmailCopyFallback() {
  document.querySelectorAll("[data-email]").forEach((link) => {
    link.addEventListener("click", async () => {
      const email = link.dataset.email;

      if (!email) {
        return;
      }

      const copied = await copyText(email).catch(() => false);

      if (!copied) {
        return;
      }

      link.dataset.status = "copied";
      link.setAttribute("aria-label", `Copied ${email}`);

      window.setTimeout(() => {
        link.removeAttribute("data-status");
        link.removeAttribute("aria-label");
      }, 2200);
    });
  });
}

/**
 * Renders all dynamic content and wires up page interactions.
 */
function initPortfolio() {
  renderNavigation(portfolio.navItems);
  renderProfile();
  renderAbout();
  renderProjects(portfolio.projects);
  renderTechnologies(portfolio.technologies);
  renderCertificates(portfolio.certificates);
  renderContact();
  setupMobileNavigation();
  setupActiveSectionTracking();
  setupEmailCopyFallback();
}

initPortfolio();
