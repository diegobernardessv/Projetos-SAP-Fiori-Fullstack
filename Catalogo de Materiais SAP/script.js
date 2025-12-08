let materiais = [];

function adicionarMaterial() {

    // Recebe valor do usuário
    const material = document.querySelector("#inputmaterial");
    let valuematerial = material.value.trim();
    const mensagem = document.querySelector("#mensagem");

    // Se o input de material estiver vazio, mostrar mensagem de erro ao usuário
    if (valuematerial == "") {

        // Mensagem de erro
        let mensagemErro = "Digite um material válido antes de continuar.";
        mensagem.textContent = mensagemErro;

    } else {

        // Inserir elemento do input no array
        materiais.push(valuematerial);

        // Chamar a função de exibir lista na tela
        exibirListaNaTela();

        // Mensagem de sucesso
        let mensagemSucesso = "Material inserido com sucesso!";
        mensagem.textContent = mensagemSucesso;
    }

    // Limpa o campo input
    document.querySelector("#inputmaterial").value = "";
}


function exibirListaNaTela() {

    const listamateriais = document.querySelector("#listamateriais");
    // Limpa a lista na tela antes de recriá-la para evitar duplicatas
    listamateriais.innerHTML = "";

    for (let i = 0; i < materiais.length; i++) {

        // Cria nova tag item e insere na lista
        let novomaterial = document.createElement("li");
        novomaterial.textContent = materiais[i];

        // criar o botão remover e inserir na linha
        let botaoRemover = document.createElement("button");
        botaoRemover.className = "remover"
        botaoRemover.textContent = "Remover"
        botaoRemover.onclick = () => removerMaterial(i);

        // criar o botão editar e inserir na linha
        let botaoEditar = document.createElement("button");
        botaoEditar.className = "editar"
        botaoEditar.textContent = "Editar"
        botaoEditar.onclick = () => editarMaterial(i);

        novomaterial.appendChild(botaoEditar);
        novomaterial.appendChild(botaoRemover);
        listamateriais.appendChild(novomaterial);
    }
}

function removerMaterial(i) {

    materiais.splice(i, 1);
    exibirListaNaTela();
    const mensagem = document.querySelector("#mensagem");
    mensagem.textContent = ""
}

function editarMaterial(i) {

    let editarMaterial = prompt("Insira o novo valor de material:");
    if (editarMaterial.trim() !== "") {
        materiais[i] = editarMaterial;
        exibirListaNaTela();
        const mensagem = document.querySelector("#mensagem");
        mensagem.textContent = ""

    } else {

        alert("Insira um material válido!")

    }
}

function deletarCatalogo() {

    if (materiais.length > 0) {
        materiais.length = 0;
        exibirListaNaTela();
        const mensagem = document.querySelector("#mensagem");
        mensagem.textContent = "Os materiais foram deletados!"
    } else {
        const mensagem = document.querySelector("#mensagem");
        mensagem.textContent = "O catálogo está vazio!"
    }
}