document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    var user = {
        name: document.getElementById('name').value,
        email: document.getElementById('mail').value,
        password: document.getElementById('password').value,
        mat: document.getElementById('mat').value,
        birthday: document.getElementById('birthday').value,
        cur: document.getElementById('cur').value,
        last: document.getElementById('last').value,
        tel: document.getElementById('tel').value,
        year: document.getElementById('year').value
    };

    const resp = await fetch('http://168.138.141.111:3000/register', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify({
            nome: `${user.name} ${user.last}`,
            matricula: user.mat,
            dataNasc: user.birthday,
            cell: user.tel,
            email: user.email,
            curso: user.cur,
            turma: user.year,
            senha: user.password
        })
      })

    alert('Solicitação enviada com sucesso!');

    window.location.href = 'index.html';
});