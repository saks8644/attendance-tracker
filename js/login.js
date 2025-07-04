

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

async function handleAuth(action) {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    if (action === 'signup' && password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    try {
        if (action === 'login') {
            await auth.signInWithEmailAndPassword(email, password);
        } else {
            await auth.createUserWithEmailAndPassword(email, password);
        }

        // ✅ Redirect to main page
        window.location.href = "index.html";
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

loginBtn.addEventListener('click', () => handleAuth('login'));

if (signupBtn) {
    signupBtn.addEventListener('click', () => handleAuth('signup'));
}
