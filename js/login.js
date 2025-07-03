const auth = firebase.auth();

document.getElementById('loginBtn').addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
        window.location.href = "index.html";
    })
    .catch(error => {
        alert(error.message);
    });
});
