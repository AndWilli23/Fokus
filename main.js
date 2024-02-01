const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__imagem')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica') 
const StartOuPauseBt = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const musicaStart = new Audio('/sons/play.wav')
const musicaPause = new Audio('/sons/pause.mp3')
const musicaBeep = new Audio('/sons/beep.mp3')
musica.loop = true

let tempoDecorrido = 1500
let intervaloId = null

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorrido = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorrido = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorrido = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto (contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML= `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case 'descanso-curto':
            titulo.innerHTML=`
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case 'descanso-longo':
            titulo.innerHTML=`
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }

}

function contagemRegressiva () {
    if (tempoDecorrido <= 0) {
        zerar()
        musicaBeep.play()
        alert('tempo finalizado!')
        return
    }
    tempoDecorrido -= 1

    mostrarTempo()
  
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId === null)
        musicaStart.play()

    else{
        zerar()
        musicaPause.play()
        return
    }

    intervaloId = setInterval(contagemRegressiva, 1000)
    startPauseBt.textContent = 'Pausar'
   
    
    
    
}

function zerar () {
    clearInterval(intervaloId)
    startPauseBt.textContent = 'Começar'
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorrido * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()