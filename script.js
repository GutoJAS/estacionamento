document.addEventListener("DOMContentLoaded", () => {
  const vagasDisponiveis = [
    { numero: "A1", disponivel: true },
    { numero: "A2", disponivel: true },
    { numero: "A3", disponivel: true },
    { numero: "A4", disponivel: true },
    { numero: "A5", disponivel: true },
    { numero: "A6", disponivel: true },
    { numero: "A7", disponivel: true },
    { numero: "A8", disponivel: true },
    { numero: "A9", disponivel: true },
    { numero: "A10", disponivel: true },
  ];

  const abaCadastro = document.getElementById("aba-cadastro");
  const abaLista = document.getElementById("aba-lista");
  const telaCadastro = document.getElementById("tela-cadastro");
  const telaLista = document.getElementById("tela-lista");
  const formularioCadastro = document.getElementById("formulario-cadastro");
  const listaItens = document.getElementById("lista-itens");
  const listaReservas = document.getElementById("lista-reservas");

  const itensCadastrados = [];
 
  function alternarAba(abaAtiva, abaInativa, telaAtiva, telaInativa) {
    abaAtiva.addEventListener("click", (e) => {
      e.preventDefault();
      abaAtiva.classList.add("ativa");
      abaInativa.classList.remove("ativa");
      telaAtiva.style.display = "block";
      telaInativa.style.display = "none";
    });
  }

  alternarAba(abaCadastro, abaLista, telaCadastro, telaLista);
  alternarAba(abaLista, abaCadastro, telaLista, telaCadastro);

  function preencherVagasDisponiveis() {
    const listaVagas = document.getElementById("vagas-disponiveis");
    listaVagas.innerHTML = "";

    vagasDisponiveis.forEach((vaga) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Vaga ${vaga.numero} ${
        vaga.disponivel ? "(Disponível)" : "(Ocupada)"
      }`;
      listaVagas.appendChild(listItem);
    });
  }

  formularioCadastro.addEventListener("submit", (e) => {
    e.preventDefault();

    const placa = document.getElementById("placa").value;
    const nomeProprietario = document.getElementById("nomeProprietario").value;
    const numeroAp = document.getElementById("numeroAp").value;
    const blocoAp = document.getElementById("blocoAp").value;
    const modeloVeiculo = document.getElementById("modeloVeiculo").value;
    const corVeiculo = document.getElementById("corVeiculo").value;

    const vagaDisponivel = vagasDisponiveis.find((vaga) => vaga.disponivel);

    if (
      placa &&
      nomeProprietario &&
      numeroAp &&
      blocoAp &&
      modeloVeiculo &&
      corVeiculo &&
      vagaDisponivel
    ) {

      vagaDisponivel.disponivel = false;

      const item = {
        placa,
        nomeProprietario,
        numeroAp,
        blocoAp,
        modeloVeiculo,
        corVeiculo,
        numeroVaga: vagaDisponivel.numero,
      };

      itensCadastrados.push(item);

      document.getElementById("placa").value = "";
      document.getElementById("nomeProprietario").value = "";
      document.getElementById("numeroAp").value = "";
      document.getElementById("blocoAp").value = "";
      document.getElementById("modeloVeiculo").value = "";
      document.getElementById("corVeiculo").value = "";

      atualizarListaItens();
      preencherVagasDisponiveis();

      abaLista.click();
    } else {
      if (!vagaDisponivel) {
        moverParaReservas({
          placa,
          nomeProprietario,
          numeroAp,
          blocoAp,
          modeloVeiculo,
          corVeiculo,
        });
      }

      document.getElementById("placa").value = "";
      document.getElementById("nomeProprietario").value = "";
      document.getElementById("numeroAp").value = "";
      document.getElementById("blocoAp").value = "";
      document.getElementById("modeloVeiculo").value = "";
      document.getElementById("corVeiculo").value = "";

      atualizarListaItens();
      preencherVagasDisponiveis();
    }
  });

  function atualizarListaItens() {
    listaItens.innerHTML = "";
    itensCadastrados.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `Vaga  ${item.numeroVaga} - Placa: ${item.placa} - Nome: ${item.nomeProprietario} - Número do Apartamento: ${item.numeroAp} - Bloco: ${item.blocoAp} - Modelo do Veículo: ${item.modeloVeiculo} - Cor do Veículo: ${item.corVeiculo}`;
      listaItens.appendChild(li);
    });
  }

  function moverParaReservas(item) {
    const listItem = document.createElement("li");
    listItem.textContent = `Reserva: Placa: ${item.placa} - Nome: ${item.nomeProprietario} - Número do Apartamento: ${item.numeroAp} - Bloco: ${item.blocoAp} - Modelo do Veículo: ${item.modeloVeiculo} - Cor do Veículo: ${item.corVeiculo}`;
    listaReservas.appendChild(listItem);
  }

  preencherVagasDisponiveis();
});
