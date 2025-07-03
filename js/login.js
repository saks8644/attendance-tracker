const auth = firebase.auth();

// 🔷 Login button logic
document.getElementById('loginBtn').addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            // ✅ Redirect to main page
            window.location.href = "index.html";
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
});

// 🔷 Optional: Sign Up button logic (if you have a signup button in login.html)
const signupBtn = document.getElementById('signupBtn');

if (signupBtn) {
    signupBtn.addEventListener('click', () => {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                // ✅ Redirect to main page
                window.location.href = "index.html";
            })
            .catch(error => {
                console.error(error);
                alert(error.message);
            });
    });
}
