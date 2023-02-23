/* mostrar tutorial */
//ao clicar deve abrir um modal com btn "proximo"
//mostrando o passo-a-passo + 1 checkbox -> mostrar novamente ao nao -> salvar no local storage para proxima vez que for abrir a pag

const msgsTutorial = [
    "Clique na tarefa para marcar como concluída ou desmarcar como concluída",
    "Dê dois cliques na tarefa para excluir."
]
function configMostrarTutorial(){
    if(localStorage.getItem("mostrarTutorial")){//se existir no localstorage
        //coleta situacao
        let mostraTutorial = JSON.parse(localStorage.getItem("mostrarTutorial"));
        console.log(mostraTutorial);
        mostraTutorial ? abrirTutorial() : null;
    }else{//primeirissimo acesso
        //senao cria
        localStorage.setItem("mostrarTutorial", "true");
        abrirTutorial();
    }
    const btnTutorial = document.getElementById("showTutorial");
    btnTutorial.addEventListener("click", abrirTutorial);
    const inputTutorial = document.getElementById("tutorial");
    inputTutorial.addEventListener("change", setMostrarTutorial);

    if(localStorage.getItem("tarefas")){
        carregaTarefas();
    }
}
function abrirTutorial(){
    //deve carregar a 1 mensagem
    const mostra = document.getElementById("showTutorial");
    mostra.click();
}
function btnProximoModal(){
    for(let i = 1; i < msgsTutorial.length; i++){
        //acessa correspondente no modal
        const eMsgModal = document.getElementById("msgModal");
        //passa nova msg
        eMsgModal.innerText = msgsTutorial[i];
        const tituloModal = document.getElementById("modal-title");
        tituloModal.innerText = `Passo ${i + 1}`
        //se i = 1 -> seta aparicao do checkbox e atualiza localStorage
        if(i == 1){
            //habilita checkbox
            displaySetTutorial();
        }
        if(i == msgsTutorial.length - 1){
            //habilita botao para fechar
            displaybtnFecharModal()
        }
    }
}
function displaySetTutorial(){
    const tutorial = document.getElementById("setTutorial");
    tutorial.style.display = "block";
}
function displaybtnFecharModal(){
    const btnProximo = document.getElementById("proximo");
    btnProximo.style.display = "none";
    const btnFechar = document.getElementById("fechar");
    btnFechar.style.display = "block";
    
}
function setMostrarTutorial(){
    let mostraTutorial = JSON.parse(localStorage.getItem("mostrarTutorial"));
    localStorage.setItem("mostrarTutorial", `${!mostraTutorial}`);
    mostraTutorial ? null : marcaInputHtml();
}
function marcaInputHtml(){
    const campo = document.getElementById("tutorial");
    campo.setAttribute('checked', "");
}
/* inserindo texto */
const btnSalvar = document.getElementById("btnSalvar");
btnSalvar.addEventListener("click", addTarefa);

function addTarefa(){
    
    const pai = document.getElementById("tarefas");
    const inputTarefa = document.getElementById("inputTarefa");
    
    let novaTarefa = inputTarefa.value.trim();
    if(novaTarefa.length){//se houver comprimento depois de limpo
        sendTarefaToLocalstorage(novaTarefa);

        const novoLi = document.createElement("li");
        novoLi.classList.add("list-group-item");

        novoLi.addEventListener("click", setConcluido);
        novoLi.addEventListener("dblclick", excluirTarefa);

        novoLi.innerText = novaTarefa;

        pai.appendChild(novoLi);
        inputTarefa.value = "";
    }else{
        window.alert('Por favor, insira um texto.');
    }
    
}
function Tarefa(tarefa){
    this.tarefa = tarefa;
    this.concluido = false;
}
function getFromLocalstorage(){
    let tarefas = [];//VOLTAR E PASSAR PRA SET INVES DE ARRAY
    if(localStorage.getItem("tarefas")){//se houver
        
        //pegar SE HOUVER o que ha atual
        let tarefasStr = localStorage.getItem("tarefas");
        //passar pra array
        tarefas = JSON.parse(tarefasStr);
        if(tarefas.length){
            let displayCard = document.getElementById("cardTarefas");
            displayCard.style.display = "block";
        }else{
            let displayCard = document.getElementById("cardTarefas");
            displayCard.style.display = "none";
        }
    }
    return tarefas;
}
function sendTarefaToLocalstorage(tarefa){
    let tarefas = getFromLocalstorage();

    let novaTarefa = new Tarefa(tarefa);
    tarefas.push(novaTarefa);
    let tarefasStr = JSON.stringify(tarefas);
    //cria
    localStorage.setItem('tarefas', tarefasStr);
    
    //add o novo
    //stringfy
    //mandar de volta pro ls
    //localStorage.setItem("tarefas", novaTarefa);
}

function setConcluido({target}){
    console.log(target.innerText);
    const tarefa = target.innerText;
    //target.innerHTML = `<s>${target.innerHTML}</s>`;
    //acessa ls
    const tarefas = getFromLocalstorage();
    //encontra tarefa e muda "concluido"
    for(const e of tarefas){
        if(e.tarefa == tarefa){
            e.concluido = !e.concluido;
            if(e.concluido){
                target.classList.add("bg-success", "text-white");
            }else{
                target.classList.remove("bg-success", "text-white");
            }
            break;
        }
    }
    //atualiza
    let tarefasStr = JSON.stringify(tarefas);
    localStorage.setItem('tarefas', tarefasStr);
}
function excluirTarefa({target}){
    let aExcluir = target.innerText;
    //remover da lista
    target.remove();
    
    //remover do localstorage
        //acessa
        //parse
        //filter?
        //devolve pro localstorage
    const tarefas = getFromLocalstorage();
    if(tarefas.length){
        let novasTarefas = tarefas.filter(
            e => e.tarefa != aExcluir
        );
        //atualiza
        tarefasStr = JSON.stringify(novasTarefas);
        localStorage.setItem("tarefas", tarefasStr);
    }
}
function carregaTarefas(){
    const pai = document.getElementById("tarefas");
    const tarefas = getFromLocalstorage();
    
    tarefas.forEach(
        e => {
            const novoLi = document.createElement("li");
            novoLi.classList.add("list-group-item");
            if(e.concluido){
                novoLi.classList.add("bg-success", "text-white");
            }
            novoLi.innerText = e.tarefa;
            novoLi.addEventListener("click", setConcluido);
            novoLi.addEventListener("dblclick", excluirTarefa);

            pai.appendChild(novoLi);
        }
    );
}