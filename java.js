/*========Canvas1 ===========*/
/*===== list all quizz ======*/
const promisseList = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
promisseList.then(renderList)

function renderList (response) {
  const divQuizz = document.querySelector('.allQuizzs')
  divQuizz.innerHTML = ''
  for(let i = 0; response.data.length > i; i++){
    let newQuizz = `<div class="quizz quizz${i}">
    <p>${response.data[i].title}</p>
    </div>`
    divQuizz.innerHTML = divQuizz.innerHTML + newQuizz
    let backGroundDiv = document.querySelector(`.quizz${i}`)
    console.log(backGroundDiv)
    backGroundDiv.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${response.data[i].image}')`
    backGroundDiv.style.backgroundSize = 'cover'
  }
  console.log(response.data)
}

function buttonCreate () {
  const canvas1 = document.querySelector('.canvas1')
  canvas1.classList.add('escondido')
  const canvas3 = document.querySelector('.canvas3')
  canvas3.classList.remove('escondido')

}




/*============== CANVAS3 ================ */
let quizzTitulo;
let quizzIMG;
let quizzPergunta;
let quizzNivel


function proximaTela() {
  const tela_inicial = document.querySelector('.tela-inicial')
  tela_inicial.classList.add('escondido');
  const tela_perguntas = document.querySelector('.tela-perguntas')
  tela_perguntas.classList.remove('escondido')
}

function proximaTela1() {
  const tela_perguntas = document.querySelector('.tela-perguntas')
  tela_perguntas.classList.add('escondido')
  const tela_inicial = document.querySelector('.tela-niveis')
  tela_inicial.classList.remove('escondido');
}

function proximaTela2() {
  const tela_niveis = document.querySelector('.tela-niveis')
  tela_niveis.classList.add('escondido')
  const tela_final = document.querySelector('.tela-final')
  tela_final.classList.remove('escondido');
}

function tela3_1 () {
  const elemento = document.querySelector('.tela-inicial')
  elemento.innerHTML = `
  <h1>Comece pelo começo</h1>
  <div class="quadro-quizz">
      <div><input type="text" minlength="20" maxlength="65" class="criar-quizz" placeholder="Título do seu quizz" /></div> 
      <div><input type="url" class="criar-quizz" placeholder="URL da imagem do seu quizz" /> </div> 
      <div><input type="text" class="criar-quizz" minlength="3" placeholder="Quantidade de perguntas do seu quizz" /> </div>  
      <div><input type="text" class="criar-quizz" minlength="2" placeholder="Quantidade de níveis do quizz" /> </div> 
  </div>

  <button onclick="proximaTela()">Prosseguir pra criar perguntas</button>
</div>`;

}
function valoresTela3_1 () {
quizzTitulo = document.querySelector('.quadro-quizz div:nth-child(1) input').value; 
quizzIMG = document.querySelector('.quadro-quizz div:nth-child(2) input').value;
quizzPergunta = document.querySelector('.quadro-quizz div:nth-child(3) input').value;
quizzNivel = document.querySelector('.quadro-quizz div:nth-child(4) input').value;

if(quizzTitulo.lenght < 20 || quizzTitulo > 65 || quizzPergunta < 3 || quizzNivel < 2) {
  alert('Por favor, preencha os dados de acordo com os requisitos')
}else {
  tela3_2();
}
}

function tela3_2 () {
  const elemento = document.querySelector('.tela-perguntas');
  elemento.innerHTML = `
  <h1>Crie suas perguntas</h1>
  `

  for(let i = 0; i < quizzPergunta.length; i++) {
    let renderizaPergunta = `
    <div class="quadro-perguntas">
      
      <div class="perguntas">
          <h2>Pergunta ${i + 1}</h2>
          
          <div class="txtPergunta"><input type="text"  minlength="20" class="criar-pergunta" placeholder="Texto da pergunta" /> </div>
          <div class="corPergunta"><input type="color" class="corPergunta" placeholder="Cor de fundo da pergunta" /></div>

      </div>
      
      
      <div class="resposta-correta">
          <h2>Resposta correta</h2>
          
          <div class="corretaResposta"><input type="text"  minlength="1" placeholder="Resposta correta" /></div>
          <div class="corretaURL"><input type="url" placeholder="URL da imagem" /> </div>

      </div>

      

      <div class="resposta-incorreta">
          <h2>Respostas incorretas</h2>
          
          <div class="incorretaResposta1>"<input type="text"  minlength="1" placeholder="Resposta incorreta 1" /> </div>
          <div class="incorretaURL>"<input type="text"  placeholder="URL da imagem 1" /> </div>
          <div class="divisor">
              <div class="incorretaResposta2"><input type="text"  minlength="1" placeholder="Resposta incorreta 2" /> </div>
              <div class="incorretaURL2"><input type="text"  placeholder="URL da imagem 2" /> </div>
          </div>
          <div class="incorretaResposta3"><input type="text"  minlength="1" placeholder="Resposta incorreta 3" /> </div>
          <div class="incorretaURL3"><input type="text" placeholder="URL da imagem 3" /> </div>

      </div>

    </div>

    `;
    elemento.innerHTML += renderizaPergunta;
  }
  <button onclick="proximaTela1()">Prosseguir pra criar Níveis</button>
}

function valoresTela3_2() {
  let elemento = document.querySelectorAll('.quadro-perguntas');

  for(let i = 0; i < elemento.lenght; i++) {
    let txtPergunta = elemento[i].querySelector('.txtPergunta input').value;
    let corPergunta = elemento[i].querySelector('.corPergunta input').value;
    let corretaResposta = elemento[i].querySelector('.corretaResposta input').value;
    let corretaURL = elemento[i].querySelector('.corretaURL input').value;
    let incorretaResposta1 = elemento[i].querySelector('.incorretaResposta1 input').value;
    let incorretaURL = elemento[i].querySelector('.incorretaURL input').value;
    let incorretaResposta2 = elemento[i].querySelector('.incorretaResposta2 input').value;
    let incorretaURL2 = elemento[i].querySelector('.incorretaURL2 input').value;
    let incorretaResposta3 = elemento[i].querySelector('.incorretaResposta3 input').value;
    let incorretaURL3 = elemento[i].querySelector('.incorretaURL3 input').value;

    if(txtPergunta < 20 || corretaResposta.lenght < 1 || incorretaResposta1.lenght < 1){
      alert('Preencha corretamente os requisitos')
      break;
    }
  }
}

