document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            const res = await fetch('http://localhost:27017/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.error("❌ Error submitting form:", err));
            const result = await res.json();

            if (res.ok) {
                alert(result.message || 'Successfully registered!');
                form.reset();
            } else {
                alert(result.error || 'Registration failed.');
            }
        } catch (error) {
            alert('⚠️ Failed to connect to server.');
            console.error(error);
        }
    });
});
