
// Animation utilities

export const staggeredFadeIn = (index: number, baseDelay: number = 100): string => {
  const delay = baseDelay * index;
  return `animate-fade-in animate-delay-${delay}`;
};

export const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

// This utility helps create fade-in-on-scroll animations
export const createScrollAnimations = () => {
  // Only run in browser
  if (typeof window === "undefined") return;

  const elements = document.querySelectorAll('.fade-in-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  elements.forEach(element => {
    observer.observe(element);
  });
  
  return () => {
    elements.forEach(element => {
      observer.unobserve(element);
    });
  };
};
