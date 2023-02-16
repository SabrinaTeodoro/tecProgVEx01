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
    console.log('abriu modal tutorial');
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
    console.log(localStorage.getItem("mostrarTutorial"));
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
        sendToLocalstorage(novaTarefa);

        const novoLi = document.createElement("li");
        novoLi.classList.add("list-group-item");
        /* novoLi.style.marginBottom = "0";
        novoLi.style.marginTop = "5px"; */

        novoLi.addEventListener("click", marcaConcluido);
        novoLi.addEventListener("dblclick", excluirTarefa);

        novoLi.innerText = novaTarefa;

        pai.appendChild(novoLi);
        inputTarefa.value = "";
    }else{
        window.alert('Por favor, insira um texto.');
    }
    
}

function sendToLocalstorage(novaTarefa){
    let tarefas = [];//VOLTAR E PASSAR PRA SET INVES DE ARRAY
    if(localStorage.getItem("tarefas")){//se houver
        //pegar SE HOUVER o que ha atual
        let tarefasStr = localStorage.getItem("tarefas");
        //passar pra array
        tarefas = JSON.parse(tarefasStr);
    }
    tarefas.push(novaTarefa);
    let tarefasStr = JSON.stringify(tarefas);
    //cria
    localStorage.setItem('tarefas', tarefasStr);
    
    //add o novo
    //stringfy
    //mandar de volta pro ls
    //localStorage.setItem("tarefas", novaTarefa);
}
function marcaConcluido({target}){
    console.log('nyo-ho');
    /* target.innerHTML = `<s>${target.innerHTML}</s>`; */
    target.classList.add("bg-success", "text-white");
}
function excluirTarefa({target}){
    let aExcluir = target.innerText
    console.log(aExcluir);
    //remover da lista
    target.remove();
    
    //remover do localstorage
        //acessa
        //parse
        //filter?
        //devolve pro localstorage
    if(localStorage.getItem('tarefas')){//se existir
        let tarefasStr = localStorage.getItem('tarefas');
        const tarefas = JSON.parse(tarefasStr);
        let novasTarefas = tarefas.filter(
            tarefa => tarefa != aExcluir
        );
        console.log(novasTarefas);
        tarefasStr = JSON.stringify(novasTarefas);
        localStorage.setItem("tarefas", tarefasStr);
    }
}
function carregaTarefas(){
    const pai = document.getElementById("tarefas");
    let tarefas = JSON.parse(localStorage.getItem("tarefas"));
    tarefas.forEach(
        tarefa => {
            const novoLi = document.createElement("li");
            novoLi.classList.add("list-group-item");
            novoLi.innerText = tarefa;
            novoLi.addEventListener("click", marcaConcluido);
            novoLi.addEventListener("dblclick", excluirTarefa);

            pai.appendChild(novoLi);
        }
    );
}