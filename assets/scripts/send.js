window.addEventListener('DOMContentLoaded', function () {
    var storedUser = sessionStorage.getItem('user');
    if (!storedUser) {
        window.location.href = 'index.html';
    }
});

document.getElementById('formInstances').addEventListener('submit', async function (e) {
    e.preventDefault();

    var valores = {
        type: document.getElementById('demandType').value,
        msg: document.getElementById('textArea').value,
    };

    sessionStorage.setItem('val', JSON.stringify(valores));

    const resp = await fetch('http://168.138.141.111:3000/request', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify({
            Aluno_matricula: sessionStorage.getItem('user'),
            Pedagogo_matricula: 20220723456,
            assunto: valores.type,
            descricao: valores.msg,
            status: 'PENDENTE'
        })
      })
    
    console.log(await resp.json())
    window.location.href = 'instances.html'
});