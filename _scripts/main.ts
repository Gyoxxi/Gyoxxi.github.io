interface ScrollRevealOptions {
  reset?: boolean;
  duration?: number;
  easing?: string;
  scale?: number;
  viewFactor?: number;
}

interface ScrollRevealObject {
  reveal(selector: string, options?: Partial<ScrollRevealOptions>): void;
}

declare function ScrollReveal(options?: ScrollRevealOptions): ScrollRevealObject;

document.addEventListener('DOMContentLoaded', () => {
  const hours = new Date().getHours();
  const isNight = hours >= 19 || hours <= 7;
  const body = document.querySelector('body') as HTMLElement;
  const toggle = document.getElementById('toggle') as HTMLElement;
  const input = document.getElementById('switch') as HTMLInputElement;

  if (isNight) {
    input.checked = true;
    body.classList.add('night');
  }

  toggle.addEventListener('click', () => {
    if (input.checked) {
      body.classList.remove('night');
    } else {
      body.classList.add('night');
    }
  });

  const intro = document.querySelector('.intro') as HTMLElement;
  const introHeight = intro.offsetHeight;
  const topButton = document.getElementById('top-button') as HTMLElement;

  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > introHeight) {
        topButton.style.opacity = '1';
        topButton.style.pointerEvents = 'auto';
      } else {
        topButton.style.opacity = '0';
        topButton.style.pointerEvents = 'none';
      }
    },
    { passive: true }
  );

  topButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const hand = document.querySelector('.emoji.wave-hand') as HTMLElement;

  const triggerWave = (): void => {
    hand.classList.add('wave');
    setTimeout(() => hand.classList.remove('wave'), 2000);
  };

  setTimeout(triggerWave, 1000);
  hand.addEventListener('mouseover', () => hand.classList.add('wave'));
  hand.addEventListener('mouseout', () => hand.classList.remove('wave'));

  const sr = ScrollReveal({
    reset: false,
    duration: 600,
    easing: 'cubic-bezier(.694,0,.335,1)',
    scale: 1,
    viewFactor: 0.3,
  });

  sr.reveal('.background');
  sr.reveal('.skills');
  sr.reveal('.experience', { viewFactor: 0.2 });
  sr.reveal('.featured-projects', { viewFactor: 0.1 });
  sr.reveal('.other-projects', { viewFactor: 0.05 });
});
