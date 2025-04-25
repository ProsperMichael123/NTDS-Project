const form = document.getElementById('contact-form');
const successMessageDiv = document.getElementById('success-message');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    service: document.getElementById('service').value,
    message: document.getElementById('message').value
  };

  try {
    const response = await fetch('http://localhost:3000/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.text();
    successMessageDiv.textContent = result;
    successMessageDiv.style.color = 'green';
    form.reset();
  } catch (err) {
    console.error(err);
    successMessageDiv.textContent = 'Failed to send message. Please try again later.';
    successMessageDiv.style.color = 'red';
  }

  // Clear the message after 20 seconds
  setTimeout(() => {
    successMessageDiv.textContent = '';
  }, 1000);
});
