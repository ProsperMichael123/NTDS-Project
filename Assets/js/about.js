const counters = document.querySelectorAll('.counter');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const value = Math.floor(progress * target);
                counter.textContent = value.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }

            requestAnimationFrame(updateCounter);
            observer.unobserve(counter);
        }
    });
}, {
    threshold: 0.6
});

counters.forEach(counter => observer.observe(counter));