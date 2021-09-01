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
let branco = true;
votos = [];



// funçao das etapas inicial

const initionEtapas = () => {
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = '';
    branco = false

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

// funcões atualiza interface
const fucntions = {
    CONFIRMA() {
        let etapa = etapas[etapaAtual];
        let votoConfirmado = false;

        if (branco === true) {
            votos.push({
                etapa: etapas[etapaAtual].titulo,
                voto: 'brnaco'
            })
            let votoConfirmado = true;
            console.log('Confirmado como BRANCO...');
        } else if (numero.length === etapa.numeros) {
            votoConfirmado = true;
            votos.push({
                etapa: etapas[etapaAtual].titulo,
                voto: numero
            })
            console.log('Confirmado como' + ' ' + numero);
        }
        if (votoConfirmado) {
            etapaAtual++;
            if (etapas[etapaAtual] !== undefined) {
                initionEtapas();
                console.log('FIM...');
            } else {
                document.querySelector('.tela').innerHTML = `<div class="aviso--gigante pisca">FIM...</div>`;
                console.log(votos);

            }
        }

    },

    CORRIGE() {
        initionEtapas()
    },
    BRANCO() {
        if (numero === '') {
            votoConfirmado = true;
            branco = true;
            seuVotoPara.style.display = 'block';
            aviso.style.display = 'block';
            numeros.innerHTML = '';
            descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`;
        }
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
    if (canditado.length > 0) {
        canditado = canditado[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${canditado.nome}<br/>Partido: ${canditado.partido}`;

        let fotosHtml = ``
        for (let i in canditado.fotos) {
            if (canditado.fotos[i].small) {
                fotosHtml += ` <div class="d-1-image small"><img src="images/${canditado.fotos[i].url}" alt="" />${canditado.fotos[i].legenda}</div> `;

            } else {

                fotosHtml += ` <div class="d-1-image"><img src="images/${canditado.fotos[i].url}" alt="" />${canditado.fotos[i].legenda}</div> `;
            }
        }
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`;
    }



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