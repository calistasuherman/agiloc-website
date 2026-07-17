(function () {
  var els = document.querySelectorAll(
    ".section-head, .card, .process-step, .news-card, .about-grid > div, .contact-grid > div, .resource-item"
  );
  function showAll() {
    els.forEach(function (el) { el.classList.add("visible"); });
  }
  els.forEach(function (el) {
    el.classList.add("reveal");
    var parent = el.parentElement;
    if (parent && (parent.classList.contains("card-grid") || parent.classList.contains("process-grid") || parent.classList.contains("news-grid"))) {
      var idx = Array.prototype.indexOf.call(parent.children, el);
      el.style.transitionDelay = (idx % 3) * 90 + "ms";
    }
  });
  if (!("IntersectionObserver" in window)) {
    showAll();
    return;
  }
  var ioHealthy = false;
  var io = new IntersectionObserver(function (entries) {
    ioHealthy = true;
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  els.forEach(function (el) { io.observe(el); });
  // Failsafe: some embedded webviews expose IntersectionObserver but never
  // deliver callbacks — content must not stay hidden there.
  setTimeout(function () {
    if (!ioHealthy) {
      io.disconnect();
      showAll();
    }
  }, 2000);
})();
