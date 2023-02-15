/* mostrar tutorial */
//ao clicar deve abrir um modal com btn "proximo"
//mostrando o passo-a-passo + 1 checkbox -> mostrar novamente ao nao -> salvar no local storage para proxima vez que for abrir a pag

/* inserindo texto */
const btnSalvar = document.getElementById("btnSalvar");
btnSalvar.addEventListener("click", addTarefa);

function addTarefa(){
    
    const pai = document.getElementById("tarefas");
    const inputTarefa = document.getElementById("inputTarefa");
    
    let novaTarefa = inputTarefa.value.trim();
    if(novaTarefa.length){//se houver comprimento depois de limpo
        sendToLocalstorage(novaTarefa);

        const novoLi = document.createElement("p");
        novoLi.style.marginBottom = "0";
        novoLi.style.marginTop = "5px";

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
    let tarefas = [];
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
    target.innerHTML = `<s>${target.innerHTML}</s>`;
}
function excluirTarefa({target}){
    let aExcluir = target.innerText
    //remover da lista
    const noPai = target.parentNode;
    noPai.remove();
    
    
    //remover do localstorage
        //acessa
        //parse
        //filter?
        //devolve pro localstorage
    if(localStorage.getItem('tarefas')){//se existir
        let tarefasStr = localStorage.getItem('tarefas');
        const tarefas = JSON.parse(tarefasStr);
        tarefas.filter(
            tarefa => console.log("-"+tarefa)
        );
        tarefasStr = JSON.stringify(tarefas);
        localStorage.setItem("tarefas", tarefasStr);
    }
}