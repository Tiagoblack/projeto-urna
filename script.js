//seleção dos elementos da pagina
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');
let btns = document.querySelectorAll('.teclado--botao');
let buttons = document.querySelectorAll('.btn');

//variaveis globais 
let etapaAtual = 0;
let candidatoEscolhido;
let numero;

// funções globais

// funçao das etapas inicial

const initionEtapas = () => {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += `<div class="numero pisca"></div>`;

        } else {

            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;

}

// função atualiza interface
const fucntions = {
    CONFIRMA() {
        alert('funciona')
        return

    },

    CORRIGE() {
        alert('CORRIGI');
    },
    BRANCO() {
        alert('BRANCO');
    }
}

const update = () => {
    let etapa = etapas[etapaAtual];
    let canditado = null
    canditado = etapa.candidatos.filter(item => {
        if (item.numero === numero.replace('undefined', '')) {
            return true
        } else {
            return false
        }
    });
    console.log('canditado', canditado)



}


//eventos dos botões
buttons.forEach(item => {
    item.addEventListener('click', e => {
        let event = e.target.innerText;
        const fucnArray = fucntions[event];
        fucnArray();

    })
})

btns.forEach(item => {
    item.addEventListener('click', e => {
        var elNumero = document.querySelector('.numero.pisca');
        let event = e.target.innerText;
        console.log('evento', event);

        if (elNumero === null) {

            numeros.innerHTML = `<div class="numero pisca"></div>`;
        } else {
            elNumero.classList.remove('pisca');
            elNumero.innerHTML += event;
            numero += `${event}`;
            console.log(numero);

            if (elNumero.nextElementSibling !== null) {

                elNumero.nextElementSibling.classList.add('pisca');
            } else {

                update();
            }
        }


    })
});




initionEtapas();