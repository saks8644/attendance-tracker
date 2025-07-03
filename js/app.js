// 🔷 Firebase references
const db = firebase.firestore();
const auth = firebase.auth();

let subjects = [];
let chart;

// 🔷 Check auth state
auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "login.html";
    } else {
        console.log("✅ Logged in as:", user.email);
        loadData(user.uid);
    }
});

// 🔷 Logout
function logout() {
    auth.signOut().then(() => {
        window.location.href = "login.html";
    }).catch(error => {
        console.error("Logout error:", error);
        alert("Failed to log out. Please try again.");
    });
}

// 🔷 Load & Save
function loadData(uid) {
    db.collection("users").doc(uid).get().then(doc => {
        if (doc.exists) {
            subjects = doc.data().subjects || [];
        } else {
            subjects = [];
        }
        render();
    }).catch(error => {
        console.error("Load error:", error);
        alert("Failed to load data.");
    });
}

function saveData() {
    const uid = auth.currentUser.uid;
    db.collection("users").doc(uid).set({ subjects })
        .catch(error => {
            console.error("Save error:", error);
            alert("Failed to save data.");
        });
}

// 🔷 Attendance actions
function addSubject() {
    const name = document.getElementById('subject').value.trim();
    const attended = parseInt(document.getElementById('attended').value);
    const total = parseInt(document.getElementById('total').value);
    const remaining = parseInt(document.getElementById('remaining').value);

    if (!name || isNaN(attended) || isNaN(total) || isNaN(remaining)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    subjects.push({ name, attended, total, remaining });
    saveData();
    render();
}

function updateAttendance(index, present) {
    if (present) {
        subjects[index].attended++;
    }
    subjects[index].total++;
    saveData();
    render();
}

function deleteSubject(index) {
    subjects.splice(index, 1);
    saveData();
    render();
}

// 🔷 Render UI
function render() {
    const container = document.getElementById('subjects');
    container.innerHTML = '';

    subjects.forEach((s, i) => {
        const currentPct = ((s.attended / s.total) * 100).toFixed(2);
        const totalAtEnd = s.total + s.remaining;
        const minAttend = Math.ceil(0.75 * totalAtEnd);
        const maxPossibleAttend = s.attended + s.remaining;
        const minAttendNeededRemaining = minAttend - s.attended;
        const maxAbsentAllowedRemaining = s.remaining - minAttendNeededRemaining;

        let msg = '';
        if (maxPossibleAttend < minAttend) {
            msg = `😞 Cannot reach 75% even if you attend all remaining.`;
        } else if (maxAbsentAllowedRemaining >= 0) {
            msg = `👍 You can still miss ${maxAbsentAllowedRemaining} class${maxAbsentAllowedRemaining !== 1 ? 'es' : ''}.`;
        } else {
            msg = `⚠️ You must attend all remaining classes to reach 75%.`;
        }

        container.innerHTML += `
            <div class="bg-gray-800 p-4 rounded-xl shadow flex flex-col gap-2">
                <div class="flex justify-between">
                    <span class="font-semibold text-lg">${s.name}</span>
                    <button onclick="deleteSubject(${i})" class="text-red-400 hover:text-red-600">🗑️</button>
                </div>
                <div>✅ Attended: ${s.attended}/${s.total} (${currentPct}%)</div>
                <div>📅 Remaining possible: ${s.remaining}</div>
                <div>${msg}</div>
                <div class="flex gap-2">
                    <button onclick="updateAttendance(${i}, true)" class="bg-green-600 hover:bg-green-700 p-1 px-2 rounded text-white">+ Present</button>
                    <button onclick="updateAttendance(${i}, false)" class="bg-red-600 hover:bg-red-700 p-1 px-2 rounded text-white">+ Absent</button>
                </div>
            </div>
        `;
    });

    renderChart();
}

// 🔷 Chart
function renderChart() {
    const ctx = document.getElementById('attendanceChart').getContext('2d');
    const labels = subjects.map(s => s.name);
    const data = subjects.map(s => ((s.attended / s.total) * 100).toFixed(2));

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Attendance %',
                data,
                backgroundColor: 'rgba(79, 70, 229, 0.7)'
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });
}
