document.getElementById('email-sign-in').addEventListener('click', function() {
    document.querySelector('.sign-in-options').style.display = 'none';
    document.getElementById('email-form').style.display = 'block';
});
document.getElementById('nextStep').addEventListener('click', function() {
       nextStep();
});

function nextStep() {
    var emailInput = document.getElementById('email');
    var usernameSpan = document.getElementById('username');
    var email = emailInput.value;

    if (email) {
        var username = email.split('@')[0];
        usernameSpan.textContent = username;

        document.querySelector('.password-group').style.display = 'flex';
        document.querySelectorAll('.input-group')[0].style.display = 'none';
        document.querySelector('.guest-mode').style.display = 'none';
        document.querySelector('.learn-more').style.display = 'none';
        document.querySelector('.buttons').style.display = 'none';
    }
}

// document.getElementById('show-password').addEventListener('change', function() {
//     var passwordInput = document.querySelector('.password-group input[type="password"]');
//     if (this.checked) {
//         passwordInput.type = 'text';
//     } else {
//         passwordInput.type = 'password';
//     }
// });

