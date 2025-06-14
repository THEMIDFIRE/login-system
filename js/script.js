// === Regex ===
var nameRegex = /^[a-zA-Z]{3,}$/; // at least 3 letters
var emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/; // valid email
var passRegex = /^.{4,}$/; // at least 4 characters

// === Registration Elements ===
var regNameInput = document.getElementById('regName');
var regNameError = document.getElementById('regNameError');
var regEmailInput = document.getElementById('regEmail');
var regEmailError = document.getElementById('regEmailError');
var regPassInput = document.getElementById('regPass');
var regPassError = document.getElementById('regPassError');
var regBtn = document.getElementById('regBtn');
var regSuccess = document.getElementById('regSuccess');

// === Login Elements ===
var loginEmailInput = document.getElementById('loginEmail');
var loginEmailError = document.getElementById('loginEmailError');
var loginPassInput = document.getElementById('loginPass');
var loginPassError = document.getElementById('loginPassError');
var loginBtn = document.getElementById('loginBtn');
var loginSuccess = document.getElementById('loginSuccess');

// === Home Page Elements ===
var welcome = document.getElementById('welcome');
var logoutBtn = document.getElementById('logout');

// === Registration Validation ===
if (regNameInput && regEmailInput && regPassInput) {
    regNameInput.addEventListener('input', function () {
        if (nameRegex.test(regNameInput.value.trim())) {
            regNameError.classList.add('d-none');
        }
    });

    regEmailInput.addEventListener('input', function () {
        if (emailRegex.test(regEmailInput.value.trim())) {
            regEmailError.classList.add('d-none');
        }
    });

    regPassInput.addEventListener('input', function () {
        if (passRegex.test(regPassInput.value.trim())) {
            regPassError.classList.add('d-none');
        }
    });

    regBtn.addEventListener('click', function (e) {
        e.preventDefault();

        var isValid = true;

        if (!nameRegex.test(regNameInput.value.trim())) {
            regNameError.classList.remove('d-none');
            regNameError.innerHTML = 'Name must be at least 3 letters';
            isValid = false;
        } else {
            regNameError.classList.add('d-none');
        }

        if (!emailRegex.test(regEmailInput.value.trim())) {
            regEmailError.classList.remove('d-none');
            regEmailError.innerHTML = 'Enter a valid email address';
            isValid = false;
        } else {
            regEmailError.classList.add('d-none');
        }

        if (!passRegex.test(regPassInput.value.trim())) {
            regPassError.classList.remove('d-none');
            regPassError.innerHTML = 'Password must be at least 4 characters';
            isValid = false;
        } else {
            regPassError.classList.add('d-none');
        }

        if (isValid) {
            var users = JSON.parse(localStorage.getItem('users')) || [];

            var emailExists = users.some(function (user) {
                return user.email === regEmailInput.value.trim();
            });

            if (emailExists) {
                regEmailError.classList.remove('d-none');
                regEmailError.innerHTML = 'This email is already registered';
                return;
            }

            var newUser = {
                name: regNameInput.value.trim(),
                email: regEmailInput.value.trim(),
                password: regPassInput.value.trim()
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            regSuccess.classList.remove('d-none');
            regSuccess.innerHTML = '✅ Registration successful! Redirecting...';

            setTimeout(function () {
                window.location.href = 'index.html';
            }, 1500);
        }
    });
}

// === Login Validation ===
if (loginEmailInput && loginPassInput) {
    loginEmailInput.addEventListener('input', function () {
        if (!emailRegex.test(loginEmailInput.value.trim())) {
            loginEmailError.classList.remove('d-none');
            loginEmailError.innerHTML = 'Enter a valid email address';
        } else {
            loginEmailError.classList.add('d-none');
        }
    });

    loginPassInput.addEventListener('input', function () {
        if (!passRegex.test(loginPassInput.value.trim())) {
            loginPassError.classList.remove('d-none');
            loginPassError.innerHTML = 'Password must be at least 4 characters';
        } else {
            loginPassError.classList.add('d-none');
        }
    });

    loginBtn.addEventListener('click', function (e) {
        e.preventDefault();

        var isValid = true;
        var enteredEmail = loginEmailInput.value.trim();
        var enteredPass = loginPassInput.value.trim();

        if (!enteredEmail) {
            loginEmailError.classList.remove('d-none');
            loginEmailError.innerHTML = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(enteredEmail)) {
            loginEmailError.classList.remove('d-none');
            loginEmailError.innerHTML = 'Enter a valid email address';
            isValid = false;
        } else {
            loginEmailError.classList.add('d-none');
        }

        if (!enteredPass) {
            loginPassError.classList.remove('d-none');
            loginPassError.innerHTML = 'Password is required';
            isValid = false;
        } else if (!passRegex.test(enteredPass)) {
            loginPassError.classList.remove('d-none');
            loginPassError.innerHTML = 'Password must be at least 4 characters';
            isValid = false;
        } else {
            loginPassError.classList.add('d-none');
        }

        if (isValid) {
            var users = JSON.parse(localStorage.getItem('users')) || [];

            var matchedUser = users.find(function (user) {
                return user.email === enteredEmail && user.password === enteredPass;
            });

            if (matchedUser) {
                localStorage.setItem('currentUser', JSON.stringify(matchedUser));

                loginSuccess.classList.remove('d-none');
                loginSuccess.innerHTML = '✅ Login successful! Redirecting...';

                setTimeout(function () {
                    window.location.href = 'home.html';
                }, 1500);
            } else {
                loginPassError.classList.remove('d-none');
                loginPassError.innerHTML = 'Incorrect email or password';
            }
        }
    });
}

// === Home Page Welcome Message ===
if (welcome) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.name) {
        welcome.innerHTML = `Welcome <span class="text-capitalize fw-bold">${currentUser.name}</span>`;
    } else {
        window.location.href = 'index.html';
    }
}

// === Logout Button Handler ===
if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
}
