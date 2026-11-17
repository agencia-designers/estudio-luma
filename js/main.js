(() => {
  const topbar = document.querySelector(".topbar");
  const burger = document.querySelector(".burger");
  const drawer = document.querySelector(".drawer");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  const onScroll = () => {
    if (!topbar) return;
    topbar.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (burger && drawer) {
    const closeDrawer = () => {
      drawer.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Abrir menu");
    };

    burger.addEventListener("click", () => {
      const open = drawer.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });

    drawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeDrawer);
    });
  }

  const reveals = document.querySelectorAll(".reveal:not(.show)");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("show"));
  }

  const openLightbox = (src, alt) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add("open"));
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    setTimeout(() => {
      lightbox.hidden = true;
      lightboxImg.src = "";
    }, 280);
  };

  document.querySelectorAll(".gallery-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      openLightbox(btn.dataset.full, btn.dataset.alt);
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox?.classList.contains("open")) {
      closeLightbox();
    }
  });
})();
