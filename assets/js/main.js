let labels = document.querySelectorAll('.labels')
let _container = document.getElementById('container')

let signUpButton = document.getElementById('sign-up-button')
let signUpEmail = document.getElementById('sign-up-email')
let signUpPassword = document.getElementById('sign-up-password')
let signUpName = document.getElementById('sign-up-name')

let signInButton = document.getElementById('sign-in-button')
let signInEmail = document.getElementById('sign-in-email')
let signInPassword = document.getElementById('sign-in-password')

labels.forEach((val) => {
    val.style.display = 'none'
})

// regex & func SingnUp

signUpButton.addEventListener('click', (e) => {
    let flag = 0
    if (signUpEmail.value.search(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/) || signUpEmail.value == null || signUpEmail.value == '') {
        signUpEmail.classList.add('falseInput')
        signUpEmail.nextElementSibling.style.display = 'flex'
        flag++
    } else {
        signUpEmail.classList.remove('falseInput')
        signUpEmail.nextElementSibling.style.display = 'none'
    }

    // email reg

    if (signUpPassword.value.search(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/) || signUpPassword.value == null || signUpPassword.value == '') {
        signUpPassword.classList.add('falseInput')
        signUpPassword.nextElementSibling.style.display = 'flex'
        flag++
    } else {
        signUpPassword.classList.remove('falseInput')
        signUpPassword.nextElementSibling.style.display = 'none'
    }

    // pass reg

    if (signUpName.value == null || signUpName.value == '') {
        signUpName.classList.add('falseInput')
        signUpName.nextElementSibling.style.display = 'flex'
        flag++
    } else {
        signUpName.classList.remove('falseInput')
        signUpName.nextElementSibling.style.display = 'none'
    }

    // func

    if (flag == 0) {
        const newTask = {
            Email: signUpEmail.value,
            Password: signUpPassword.value,
            FullName: signUpName.value,
        };
        fetch('https://655fc95e83aba11d99cfdd1b.mockapi.io/api/arshia/users', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            // Send your data in the request body as JSON
            body: JSON.stringify(newTask)
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(task => {
            // do something with the new task
            swal("Dear " + signUpName.value + " , Your account has been created!", "Now you can log in to your account", "success");
            signUpEmail.value = ''
            signUpPassword.value = ''
            signUpName.value = ''
            _container.classList.remove('active')
        }).catch(error => {
            // handle error
            swal('Error 404', "please try again", "error");
        })
    } else {
        swal("Please fill all fields", "You have not filled out some of the required fields!", "warning")
    }
})

// regex & func Login


signInButton.addEventListener('click', () => {

    fetch('https://655fc95e83aba11d99cfdd1b.mockapi.io/api/arshia/users', {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
    }).then(tasks => {
        // Do something with the list of tasks
        flagfind = 0;
        for (let i in tasks) {
            if (signInEmail.value == tasks[i].Email && signInPassword.value == tasks[i].Password) {
                username = tasks[i].FullName;
                findUserOk(username);
                break;
            } else {
                flagfind++;
            }

            if (flagfind == tasks.length) {
                swal('User Not Found', "please try again", "error");
            }
        }
    }).catch(error => {
        // handle error
        swal('Error 404', "please try again", "error");
    })

})

// if signin sucsess


const findUserOk = (username) => {
    document.querySelector(".container").remove();
    document.querySelector(".user-welcome").style.display = 'flex';
    document.querySelector(".mb").innerHTML = `
    welcome dear ${username}
    `;
};

document.getElementById('log-out').addEventListener("click", () => {
    location.reload();
});

document.getElementById('pass-error').addEventListener('click' , ()=>{
    swal('Password Error', "Password must be 8-16 characters and contain number and Uppercase letters and special characters", "warning");
})