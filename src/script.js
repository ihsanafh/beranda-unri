const counters = document.querySelectorAll('.count');
const speed = 200; // Adjust animation speed here

function startCounting() {
  counters.forEach(counter => {
    let isCounting = false;

    function updateCount() {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;

      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    }

    function handleScroll() {
      const rect = counter.getBoundingClientRect();
      const isVisible = (rect.top >= 0) && (rect.bottom <= window.innerHeight);
      if (isVisible && !isCounting) {
        isCounting = true;
        updateCount();
      } else if (!isVisible && isCounting) {
        // Stop counting if counter is not visible
        isCounting = false;
      }
    }

    // Initial check
    handleScroll();

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
  });
}

// Start counting when the page is loaded
window.addEventListener('load', startCounting);

