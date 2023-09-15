document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var user = await fetch('http://168.138.141.111:3000/login', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        referrerPolicy: "unsafe-url",
        mode: "cors",
        body: JSON.stringify({
            email,
            senha: password
        })
    })
    
    console.log(user)
    var aluno = await user.json();

    console.log(aluno)
    sessionStorage.setItem('user', aluno.matricula)
    sessionStorage.setItem('email', aluno.email)

    if (aluno.matricula != undefined) {
        window.location.href = 'instances.html';
    } else {
        alert('Dados inválidos. Por favor, tente novamente.');
    }
});