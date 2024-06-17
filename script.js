document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = validateForm();

    if (isValid) {
        let formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value,
        };

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('responseMessage').innerText = 'Форма успешно отправлена!';
            document.getElementById('contactForm').reset();
        })
        .catch(error => {
            document.getElementById('responseMessage').innerText = 'Ошибка отправки формы.';
        });
    }
});

document.getElementById('phone').addEventListener('input', function(event) {
    let value = event.target.value;
    event.target.value = value.replace(/[^\d]/g, '');
});

function validateForm() {
    let isValid = true;

    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let message = document.getElementById('message').value;

    document.getElementById('firstNameError').innerText = '';
    document.getElementById('lastNameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('phoneError').innerText = '';
    document.getElementById('messageError').innerText = '';

    if (firstName.trim() === '') {
        document.getElementById('firstNameError').innerText = 'Имя обязательно';
        isValid = false;
    }

    if (lastName.trim() === '') {
        document.getElementById('lastNameError').innerText = 'Фамилия обязательна';
        isValid = false;
    }

    if (email.trim() === '') {
        document.getElementById('emailError').innerText = 'Почта обязательна';
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('emailError').innerText = 'Неверный формат почты';
        isValid = false;
    }

    if (phone.trim() === '') {
        document.getElementById('phoneError').innerText = 'Номер телефона обязателен';
        isValid = false;
    }

    if (message.trim() === '') {
        document.getElementById('messageError').innerText = 'Сообщение обязательно';
        isValid = false;
    }

    return isValid;
}

function validateEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
