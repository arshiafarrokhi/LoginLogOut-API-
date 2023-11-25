function para() {

    const newTask = {
        Email: document.getElementById('sign-up-email').value,
        Password: document.getElementById('sign-up-password').value,
        FullName: document.getElementById('sign-up-name').value,
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
        alert('ok')
    }).catch(error => {
        // handle error
        alert('not ok')
    })
}



