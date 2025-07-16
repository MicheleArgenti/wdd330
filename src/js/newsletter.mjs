
export function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const feedback = form.querySelector('.form-feedback');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const emailAddress = form.email.value.trim();


    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailAddress || !emailPattern.test(emailAddress)) {
      feedback.textContent = 'Please enter a valid email address.';
      return;
    }

    try {
      feedback.textContent = 'Submitting...';

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailAddress }),
      });

      if (response.ok) {
        feedback.textContent = 'Thank you for subscribing!';
        form.reset();
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      console.error('Newsletter submission failed:', error);
      feedback.textContent = 'Something went wrong. Please try again later.';
    }
  });
}
