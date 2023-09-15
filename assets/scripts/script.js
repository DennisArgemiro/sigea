window.addEventListener('DOMContentLoaded', function () {
  var storedUser = sessionStorage.getItem('user');
  if (!storedUser) {
    window.location.href = 'index.html';
  }
});

var email = sessionStorage.getItem('email')

const url = 'https://jsonplaceholder.typicode.com/posts'

const addButton = document.querySelector('#addButton')
const loadingElement = document.querySelector('#loading')
const empty = document.querySelector('#empty-message')
const mainContent = document.querySelector('.content')
const subContent = document.querySelector('.instance')

const urlSearchParams = new URLSearchParams(window.location.search)
const urlId = urlSearchParams.get('id')

var matricula = sessionStorage.getItem('user')

async function getApi() {
  const response = await fetch('http://168.138.141.111:3000/selectReclamacao', {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    mode: "cors",
    body: JSON.stringify({
      param: `none`
    })
  })
  const data = await response.json();
  console.log(data)
  data.map(async (post) => {
    if (email.endsWith("@ifpa.edu.br")) {
      const response = await fetch('http://168.138.141.111:3000/selectReclamacao', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify({
          param: `none`
        })
      })
      const data = await response.json();

      addButton.classList.add("hide")
      loadingElement.classList.add("hide")
      let project = document.createElement('div');
      project.innerHTML = `
                        <div class="box">
                          <h1 class="title">${post.assunto}</h1>
                          <p class="date">${post.status}</p>
                          <a href="getInstance.html?id=${post.idReclamacao}">
                            <img src="assets/images/details.png" class="icon">
                          </a>
                        </div>
                      `;
      mainContent.appendChild(project);
    } else {
      if (post.Aluno_matricula == matricula) {
        loadingElement.classList.add("hide")
        let project = document.createElement('div');
        project.innerHTML = `
                        <div class="box">
                          <h1 class="title">${post.assunto}</h1>
                          <p class="date">${post.status}</p>
                          <a href="getInstance.html?id=${post.idReclamacao}">
                            <img src="assets/images/details.png" class="icon">
                          </a>
                        </div>
                      `;
        mainContent.appendChild(project);
      }
    }
  });
}

async function getApiToo(id) {
  const resp = await fetch('http://168.138.141.111:3000/selectReclamacao', {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    mode: "cors",
    body: JSON.stringify({
      param: "id",
      value: id
    })
  })
  const dat = await resp.json();

  const one = document.querySelector('.one')
  const two = document.querySelector('.two')
  const three = document.querySelector('.three')
  const four = document.querySelector('.four')

  one.innerText = dat.assunto
  two.innerText = dat.descricao
  three.innerText = dat.status
  four.innerText = dat.resposta

  if (email.endsWith("@ifpa.edu.br")) {
    const resp = document.querySelector('#resp')

    resp.classList.remove("hide")

    resp.addEventListener('click', () => {
      exibirInput('resp', 'respInput');
    });

    document.getElementById('respSubmit').addEventListener('click', async () => {
      const novoDado = {
        body: document.getElementById('respInputField').value
      };
      await fetch('http://168.138.141.111:3000/answerPedagogo', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify({
          idSolicitacao: urlId,
          pedagogo: 20220723456,
          resposta: novoDado.body
        })
      })
      esconderInput('resp', 'respInput');
      location.reload(true)
    });
  }

  function exibirInput(btnId, inputId) {
    document.getElementById(btnId).style.display = 'none';
    document.getElementById(inputId).style.display = 'block';
  }

  function esconderInput(btnId, inputId) {
    document.getElementById(btnId).style.display = 'block';
    document.getElementById(inputId).style.display = 'none';
  }
}

if (!urlId) {
  getApi();
} else {
  getApiToo(urlId);
}