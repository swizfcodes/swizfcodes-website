
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
