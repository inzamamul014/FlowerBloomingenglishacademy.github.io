// Authentication state listener
firebase.auth().onAuthStateChanged(user => {
  const authLink = document.getElementById('auth-link');
  const welcomeMessage = document.getElementById('welcome-message');
  if (user) {
    authLink.textContent = 'Logout';
    authLink.href = '#';
    authLink.onclick = () => firebase.auth().signOut();
    if (welcomeMessage) {
      welcomeMessage.textContent = `Welcome, ${user.email}!`;
    }
  } else {
    authLink.textContent = 'Login';
    authLink.href = 'login.html';
    if (welcomeMessage) {
      welcomeMessage.textContent = 'Please log in to access personalized features.';
    }
    // Redirect to login if not authenticated
    if (window.location.pathname !== '/login.html' && window.location.pathname !== '/admission.html') {
      window.location.href = 'login.html';
    }
  }
});

// Login form
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => window.location.href = 'index.html')
      .catch(err => {
        document.getElementById('error-message').textContent = err.message;
      });
  });
}

// Notices page
const noticesList = document.getElementById('notices-list');
if (noticesList) {
  db.collection('notices').onSnapshot(snapshot => {
    noticesList.innerHTML = '';
    snapshot.forEach(doc => {
      const notice = doc.data();
      const li = document.createElement('li');
      li.innerHTML = `<h3>${notice.title}</h3><p>${notice.content}</p><small>${notice.date}</small>`;
      noticesList.appendChild(li);
    });
  }, err => console.error(err));
}

// Homework page
const homeworkList = document.getElementById('homework-list');
if (homeworkList) {
  db.collection('homework').onSnapshot(snapshot => {
    homeworkList.innerHTML = '';
    snapshot.forEach(doc => {
      const homework = doc.data();
      const li = document.createElement('li');
      li.innerHTML = `<h3>${homework.title}</h3><p>Subject: ${homework.subject}</p><p>Due: ${homework.dueDate}</p>`;
      homeworkList.appendChild(li);
    });
  }, err => console.error(err));
}

// Admission form
const admissionForm = document.getElementById('admission-form');
if (admissionForm) {
  admissionForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    db.collection('admissions').add({
      name,
      email,
      phone,
      status: 'Pending',
      submittedAt: new Date().toISOString().split('T')[0]
    })
    .then(() => {
      document.getElementById('admission-message').textContent = 'Application submitted successfully!';
      admissionForm.reset();
    })
    .catch(err => {
      document.getElementById('admission-message').textContent = 'Error: ' + err.message;
    });
  });
}
