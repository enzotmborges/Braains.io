const medida = "px";
const medidaRotacao = "deg";
const alturaInicialAvatar = 100; // em pixels
const larguraInicialAvatar = 100; // em pixels
const tamanhoMovimento = 20;
const centroTelaHorizontal = window.innerWidth / 2;
const centroTelaVertical = window.innerHeight / 2;
const metadeLarguraAvatar = larguraInicialAvatar / 2;
const metadeAlturaAvatar = alturaInicialAvatar / 2;
const multiplicadorTamanhoCenario = 2;

const posicaoCenarioSuperiorInicial = 0;
const posicaoCenarioEsquerdaInicial = 0;
const imgCenario = document.createElement('img');
imgCenario.src = './cenario.jpg';
imgCenario.style.position = "fixed";
imgCenario.style.top = posicaoCenarioSuperiorInicial + medida;
imgCenario.style.left = posicaoCenarioEsquerdaInicial + medida;
imgCenario.style.width = (window.screen.width * multiplicadorTamanhoCenario) + medida;
imgCenario.style.height = (window.screen.height * multiplicadorTamanhoCenario) + medida;
imgCenario.style.zIndex = -1;
document.body.appendChild(imgCenario);

const posicaoAvatarSuperiorInicial = centroTelaVertical - metadeAlturaAvatar;
const posicaoAvatarEsquerdaInicial = centroTelaHorizontal - metadeLarguraAvatar;
const imgAvatar = document.createElement('img');
imgAvatar.src = './avatar.png';
imgAvatar.style.position = "absolute";
imgAvatar.style.top = posicaoAvatarSuperiorInicial + medida;
imgAvatar.style.left = posicaoAvatarEsquerdaInicial + medida;
imgAvatar.style.width = larguraInicialAvatar + medida;
imgAvatar.style.height = alturaInicialAvatar + medida;
imgAvatar.style.zIndex = 999;
imgAvatar.style.rotate = 0 + medidaRotacao;
document.body.appendChild(imgAvatar);

function moverCenarioParaDireita() { // declaração da função que move o cenário para a esquerda, enquanto o avatar se "move" para a direita
    let leftCenario = parseInt(imgCenario.style.left.replace("px", "")); // declaração da variável leftCenario que captura a posição da esquerda do cenário
    let posicaoFinalDireitaCenario = parseInt(imgCenario.style.width.replace("px", "")) - window.innerWidth; // ajuste para calcular o limite direito do cenário
    if (Math.abs(leftCenario) < posicaoFinalDireitaCenario) { // valida se a posição da esquerda do cenário é "menor" que a posição final da direita do cenário
        imgCenario.style.left = (leftCenario - tamanhoMovimento) + "px"; // move o cenário para a esquerda, utilizando css
    } else {
        imgCenario.style.left = -posicaoFinalDireitaCenario + "px"; // ajusta para não ultrapassar o limite
    }
}

function moverCenarioParaEsquerda() {
    let leftCenario = parseInt(imgCenario.style.left.replace("px", ""));
    if (leftCenario < 0) { // verifica se o cenário pode se mover para a esquerda
        imgCenario.style.left = (leftCenario + tamanhoMovimento) + "px";
    } else {
        imgCenario.style.left = "0px"; // ajusta para não ultrapassar o limite
    }
}

function moverCenarioParaCima() {
    let topCenario = parseInt(imgCenario.style.top.replace("px", ""));
    if (topCenario < 0) { // verifica se o cenário pode se mover para cima
        imgCenario.style.top = (topCenario + tamanhoMovimento) + "px";
    } else {
        imgCenario.style.top = "0px"; // ajusta para não ultrapassar o limite
    }
}

function moverCenarioParaBaixo() {
    let topCenario = parseInt(imgCenario.style.top.replace("px", ""));
    let posicaoFinalBaixoCenario = parseInt(imgCenario.style.height.replace("px", "")) - window.innerHeight; // ajuste para calcular o limite inferior do cenário
    if (Math.abs(topCenario) < posicaoFinalBaixoCenario) { // valida se a posição do topo do cenário é "menor" que a posição final de baixo do cenário
        imgCenario.style.top = (topCenario - tamanhoMovimento) + "px";
    } else {
        imgCenario.style.top = -posicaoFinalBaixoCenario + "px"; // ajusta para não ultrapassar o limite
    }
}

(function () { // execução em tempo real das linhas de código do bloco de função inominada
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        try {
            var eventDoc,
                doc,
                body;

            event = event || window.event; // IE-ism

            if (event.pageX == null && event.clientX != null) {
                eventDoc = (event.target && event.target.ownerDocument) || document;
                doc = eventDoc.documentElement;
                body = eventDoc.body;

                event.pageX = event.clientX +
                    (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                    (doc && doc.clientLeft || body && body.clientLeft || 0);
                event.pageY = event.clientY +
                    (doc && doc.scrollTop || body && body.scrollTop || 0) -
                    (doc && doc.clientTop || body && body.clientTop || 0);
            }

            let xArroundImg = event.pageX - (parseInt(imgAvatar.style.left.replace("px", "")) + (larguraInicialAvatar / 2));
            let yArroundImg = event.pageY - (parseInt(imgAvatar.style.top.replace("px", "")) + (alturaInicialAvatar / 2));
            let imgAvatarAngleDeg = Math.atan2(yArroundImg, xArroundImg) * 180 / Math.PI;
            imgAvatar.style.rotate = imgAvatarAngleDeg + "deg";
            return false;
        } catch (e) {
            console.error("Eita! Aconteceu alguma coisa que não deu certo finalizar as linhas de código para o evento onmousemove. Veja o erro: ", e);
        }
    }

    document.onkeydown = handleKeyDown;
    function handleKeyDown(event) {
        try {
            event = event || window.event; // IE-ism
            console.log(event.keyCode); // exibe o código da tecla pressionada
            switch (event.keyCode) {
                case 39:
                case 68:
                    // console.log("seta/movimento para direita");
                    moverCenarioParaDireita();
                    break;
                case 37:
                case 65:
                    // console.log("seta/movimento para esquerda");
                    moverCenarioParaEsquerda();
                    break;
                case 38:
                case 87:
                    // console.log("seta/movimento para cima");
                    moverCenarioParaCima();
                    break;
                case 40:
                case 83:
                    // console.log("seta/movimento para baixo");
                    moverCenarioParaBaixo();
                    break;
                default:
                    console.error("tecla não programada ainda...");
                    break;
            }
        } catch (e) {
            console.error("Eita! Aconteceu alguma coisa que não deu certo finalizar as linhas de código para o evento onkeyeup. Veja o erro: ", e);
        }
    }
})();
