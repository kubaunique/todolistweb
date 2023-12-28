document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Fetch user data from the API
    fetch(`https://658bea59859b3491d3f50db8.mockapi.io/users`)
        .then(response => response.json())
        .then(users => {
            // Check if the entered username and password match any user in the fetched data
            const foundUser = users.find(user => user.username === username && user.password === password);

            if (foundUser) {
                // Perform actions for successful login (replace with your actual login logic)
                const message = document.getElementById('loginMessage');
                message.textContent = 'Login successful!';
                
                // Redirect to the index page after successful login
                window.location.replace('index.html');
            } else {
                // Handling incorrect credentials
                const message = document.getElementById('loginMessage');
                message.textContent = 'Invalid username or password. Please try again.';
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            // Handle error if unable to fetch user data
            const message = document.getElementById('loginMessage');
            message.textContent = 'Login failed. Please try again later.';
        });
});
