
  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".neon-project-card");

    cards.forEach(card => {
      card.addEventListener("touchstart", () => {
        // Remove from others
        cards.forEach(c => c.classList.remove("touch-active"));
        // Add to tapped one
        card.classList.add("touch-active");
      });
    });

    // Optional: remove class on document tap
    document.addEventListener("touchstart", e => {
      if (!e.target.closest(".neon-project-card")) {
        cards.forEach(c => c.classList.remove("touch-active"));
      }
    });
  });

  const title = document.querySelector('.project-title');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          title.classList.add('animate');
        }
      });
    },
    { threshold: 0.5 }
  );

  if (title) observer.observe(title);

  const grid = document.querySelector('.projects-grid');
  let shuffleInterval;

  function shuffleCardsFLIP() {
    const cards = Array.from(grid.children);

    // Step 1: Store initial positions
    const positions = new Map();
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      positions.set(card, rect);
    });

    // Step 2: Shuffle cards
    const shuffled = cards
      .map(card => ({ card, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(obj => obj.card);

    shuffled.forEach(card => grid.appendChild(card)); // reorder in DOM

    // Step 3: Calculate new positions and apply transforms
    shuffled.forEach(card => {
      const first = positions.get(card);
      const last = card.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;

      card.style.transform = `translate(${dx}px, ${dy}px)`;
      requestAnimationFrame(() => {
        card.style.transition = 'transform 0.6s ease';
        card.style.transform = '';
      });
    });
  }

  // Start and stop functions with hover handling
  /*function startShuffle() {
    shuffleInterval = setInterval(shuffleCardsFLIP, 3000);
  }

  function stopShuffle() {
    clearInterval(shuffleInterval);
  }

  grid.addEventListener('mouseenter', stopShuffle);
  grid.addEventListener('mouseleave', startShuffle);

  startShuffle();*/

  

  //toogle icon navbar

  //scroll sections
  let sections = document.querySelectorAll('section');
  let navLinks = document.querySelectorAll('header nav a');

  window.onscroll = () => {
    sections.forEach(sec => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 100;
      let height = sec.offsetHeight;
      let id = sec.getAttribute('id');

     if (top >= offset && top < offset + height) {
        // Remove 'active' from all nav links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });

        // Add 'active' to the correct nav link
        const activeLink = document.querySelector(`header nav a[href*="${CSS.escape(id)}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });

    // active sections
          const sectionObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show-animation');
            } else {
              entry.target.classList.remove('show-animation'); // allow repeat
            }
          });
        });

        document.querySelectorAll(
          '.home-content, .projects, .projects-grid, .neon-project-card, .blog-div, .blogs-articles-header, .blog-article'
        ).forEach(section => {
          sectionObserver.observe(section);
        });

   


    // sticky header
    let header = document.querySelector('my-portfolio-header')

    header.classList.toggle('sticky', window.scrollY > 100);
  }

   const menuIcon = document.querySelector("#menu-icon");
   const navbar = document.querySelector(".portfolio-navbar");
   const overlay = document.getElementById(".menu-overlay");

   menuIcon.onclick = () => {
     menuIcon.classList.toggle("bx-x");
     navbar.classList.toggle("active");
     overlay.classList.toggle("active");
   }

    overlay.addEventListener("click", () => {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
  });



  