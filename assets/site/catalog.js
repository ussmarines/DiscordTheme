// Native links and downloads work without JavaScript. Only enhance location cues.
const sections = document.querySelectorAll('.theme[id]');
if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            document.querySelectorAll('.palette-nav a').forEach(link => {
                if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
                else link.removeAttribute('aria-current');
            });
        }
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
}
