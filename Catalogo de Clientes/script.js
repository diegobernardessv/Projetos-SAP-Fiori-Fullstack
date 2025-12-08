let clientes = [];

function adicionarCliente() {

    // Recebe valor do usuário
    const cliente = document.getElementById("inputcliente");
    let valuecliente = cliente.value.trim();
    const mensagem = document.getElementById("mensagem");

    // Se o input de cliente estiver vazio, mostraremos uma mensagem de erro
    if (valuecliente == "") {

        // Mensagem de erro
        let mensagemErro = "Digite um cliente válido antes de continuar.";
        mensagem.textContent = mensagemErro;

    } else {

        // Inserir elemento do input no array
        clientes.push(valuecliente);

        // Chamar a função de montar lista na tela
        exibirListaNaTela();

        // Mensagem de sucesso
        let mensagemSucesso = "Cliente adicionado com sucesso!";
        mensagem.textContent = mensagemSucesso;
    }

    // limpa o campo input
    document.getElementById("inputcliente").value = "";
}

function exibirListaNaTela() {

    const listaclientes = document.getElementById("listaclientes");
    // Limpa a lista na tela antes de recriá-la para evitar duplicatas
    listaclientes.innerHTML = "";

    for (let i = 0; i < clientes.length; i++) {

        // Cria nova tag item e insere na lista
        let novocliente = document.createElement("li");
        novocliente.textContent = clientes[i];

        // criar o botão remover e inserir na linha
        let botaoRemover = document.createElement("button");
        botaoRemover.className = "remover"
        botaoRemover.textContent = "Remover"
        botaoRemover.onclick = () => removerCliente(i);

        // criar o botão editar e inserir na linha
        let botaoEditar = document.createElement("button");
        botaoEditar.className = "editar"
        botaoEditar.textContent = "Editar"
        botaoEditar.onclick = () => editarCliente(i);

        novocliente.appendChild(botaoRemover);
        novocliente.appendChild(botaoEditar);
        listaclientes.appendChild(novocliente);
    }
}

function removerCliente(i) {
    clientes.splice(i, 1);
    exibirListaNaTela();
}

function editarCliente(i) {
    let clienteEditar = prompt("Insira o novo valor de cliente:");
    if (clienteEditar.trim() !== "") {
        clientes[i] = clienteEditar;
        exibirListaNaTela();

    } else {
        alert("Insira um cliente válido!")
    }
}

function deletarClientes() {
    clientes.length = 0;
    exibirListaNaTela();
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = "Os clientes foram deletados!"
}