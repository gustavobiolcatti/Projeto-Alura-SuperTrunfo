function adicionarVitoria(jogador) {
	jogadores[jogador].vitorias++;
	
	for (let i = 0; i < jogadores.length; i++) {
		if (jogadores[i].nome != jogadores[jogador].nome) {
			jogadores[i].derrotas++;
		}
	}
	calcularPontos();
}

function adicionarEmpate() {
	for (let i = 0; i < jogadores.length; i++) {
		jogadores[i].empates++;
	}
	calcularPontos();
}

function alterarJogador() {
	const nome = document.getElementById("nome");
	
	jogadores[0].nome = nome.value;
	nome.value = "";
	
	exibirJogadores();
}

function calcularPontos() {
	for (let i = 0; i < jogadores.length; i++) {
		jogadores[i].pontos = (jogadores[i].vitorias * 3) + jogadores[i].empates;
	}
	
	exibirJogadores(jogadores);
}

function exibirCarta(jogador) {
	if (jogador == "robo") {
		const imagem = document.getElementById("carta__robo-imagem");
		const campoNome = document.getElementById("carta__robo-nome");
		const campoAtributos = document.getElementById("carta__robo-atributos");
		let atributos = "";

		campoNome.innerHTML = cartaRobo.nome;
		imagem["src"] = cartaRobo.imagem;

		for (let i in cartaRobo.atributos) {
			atributos += "<p class='carta__input'>" + i + "</p>";
			atributos += "<p class='carta__atributo'>" + cartaRobo.atributos[i] + "</p>"
		}

		campoAtributos.innerHTML = atributos;
	}
	else if (jogador == "usuario") {
		const imagem = document.getElementById("carta__usuario-imagem");
		const campoNome = document.getElementById("carta__usuario-nome");
		const campoAtributos = document.getElementById("atributos");

		let atributos = "";

		campoNome.innerHTML = cartaUsuario.nome;
		imagem["src"] = cartaUsuario.imagem;

		for (let i in cartaUsuario.atributos) {
			atributos += "<label class='carta__input'><input type='radio' name='atributo' value=" + i + " checked> " + i + "</label>";
			atributos += "<p class='carta__atributo'>" + cartaUsuario.atributos[i] + "</p>"
		}

		campoAtributos.innerHTML = atributos;
	}
}

function exibirJogadores() {
	const tabelaJogadores = document.getElementById("tabelaJogadores");
	let elemento = "";

	for (let i = 0; i < jogadores.length; i++) {
		elemento += "<tr class='tabela__linha'>";
		
		if (jogadores[i].nome != "computador") {
			elemento += "<td id='nomeJogador' class='tabela__nome-time' style='background-image: url(" + jogadores[i].imagem + ");'>" + jogadores[i].nome + "</td>";
		}
		else {
			elemento += "<td id='nomeRobo' class='tabela__nome-time' style='background-image: url(" + jogadores[i].imagem + ");'>" + jogadores[i].nome + "</td>";
		}
		
		elemento += "<td>" + jogadores[i].vitorias + "</td>";
		elemento += "<td>" + jogadores[i].empates + "</td>";
		elemento += "<td>" + jogadores[i].derrotas + "</td>";
		elemento += "<td>" + jogadores[i].pontos + "</td>";
		elemento += "</tr>";
	}

	tabelaJogadores.innerHTML = elemento;
}

function exibirMensagem(tipo, msg) {	
	if (tipo == "derrota") {
		resultado.classList.add("formulario__resultado-derrota--ativo");
		resultado.innerHTML = msg;
	}
	else if (tipo == "vitoria") {
		resultado.classList.add("formulario__resultado-vitoria--ativo");
		resultado.innerHTML = msg;
	}
}

function exibirRestantes() {
	restantesUsuario.innerHTML = baralhoUsuario.length;
	restantesRobo.innerHTML = baralhoRobo.length;
}

function jogar() {
	const atributo = obtemAtributo();
	
	valorUsuario = cartaUsuario.atributos[atributo];
	valorRobo = cartaRobo.atributos[atributo];
	
	botaoJogar.disabled = true;
	
	exibirCarta("robo");
	
	if (valorUsuario > valorRobo) {
		exibirMensagem("vitoria", "Você ganhou!<br>Você ganhou a carta!");
		retirarCarta("robo");
		adicionarVitoria(0);
	}
	else if (valorUsuario < valorRobo) {
		exibirMensagem("derrota", "Você perdeu!<br>Você perdeu sua carta!");
		retirarCarta("usuario");
		adicionarVitoria(1);
	}
	else {
		exibirMensagem("derrota", "Empatou!");
		adicionarEmpate();
	}
	
	verificarPlacar();
	exibirRestantes();
}

function obtemAtributo() {
	const radioButton = document.getElementsByName("atributo");
	
	for (let i = 0; i < radioButton.length; i++) {
		if (radioButton[i].checked) {
			return radioButton[i].value;	
		}
	}
}

function verificarPlacar() {	
	if (baralhoUsuario == 0) {
		botaoSortear.disabled = true;
		exibirMensagem("derrota", "Você não possui mais cartas!");
	}
	else if (baralhoRobo == 0) {
		botaoSortear.disabled = true;
		exibirMensagem("vitoria", "Seu oponente não possui mais cartas!");
	}
}

function resetarJogo() {
	exibicao.classList.remove("exibicao--ativo");
	
	botaoSortear.disabled = false;
	botaoJogar.disabled = true;
	
	baralhoUsuario = [...baralhoUsuarioOriginal];
	baralhoRobo = [...baralhoRoboOriginal];
	
	for (let i = 0; i < jogadores.length; i++) {
		jogadores[i].vitorias = 0;
		jogadores[i].empates = 0;
		jogadores[i].derrotas = 0;
		jogadores[i].pontos = 0;
	}
	
	exibirJogadores(jogadores);
	exibirRestantes();
}

function resetarRobo() {
	const imagem = document.getElementById("carta__robo-imagem");
	const campoNome = document.getElementById("carta__robo-nome");
	const campoAtributos = document.getElementById("carta__robo-atributos");
	let atributos = "";

	campoNome.innerHTML = "";
	imagem["src"] = "";

	for (let i in cartaRobo.atributos) {
		atributos += "<p class='carta__input'>" + i + "</p>";
		atributos += "<p class='carta__atributo'>" + 0 + "</p>"
	}

	campoAtributos.innerHTML = atributos;
}

function retirarCarta(jogador) {
	let cartaPerdida;
	
	if (jogador == "robo") {
		for (let i in baralhoRobo) {
			if (baralhoRobo[i].nome == cartaRobo.nome) {
				cartaPerdida = baralhoRobo.splice(i, 1)[0];
				baralhoUsuario.push(cartaPerdida);
			}
		}
	}
	else if (jogador == "usuario") {
		for (let i in baralhoUsuario) {
			if (baralhoUsuario[i].nome == cartaUsuario.nome) {
				cartaPerdida = baralhoUsuario.splice(i, 1)[0];
				baralhoRobo.push(cartaPerdida);
			}
		}
	}
}

function sortearCartas() {
	cartaUsuario = baralhoUsuario[parseInt(Math.random() * baralhoUsuario.length)];
	cartaRobo = baralhoRobo[parseInt(Math.random() * baralhoRobo.length)];
	
	botaoJogar.disabled = false;
	
	exibicao.classList.add("exibicao--ativo");
	resultado.classList.remove("formulario__resultado-derrota--ativo");
	resultado.classList.remove("formulario__resultado-vitoria--ativo");

	while (cartaUsuario == cartaRobo) {
		sortearCarta();
	}
	
	exibirCarta("usuario");
	resetarRobo();
}

const restantesUsuario = document.getElementById("restantesUsuario");
const restantesRobo = document.getElementById("restantesRobo");
const botaoSortear = document.getElementById("btnSortear");
const botaoJogar = document.getElementById("btnJogar");
const resultado = document.getElementById("resultado");
const exibicao = document.getElementById("exibicao");

const baralhoUsuarioOriginal = [
	{	
		nome: "bulbassauro",
		imagem: "img/pokemon/Bulbasaur.gif",
		atributos: { ataque: 5, defesa: 7, poder: 6 }
	},
	{
		nome: "ivyssauro",
		imagem:	"img/pokemon/Ivysaur.gif",
		atributos: { ataque: 8, defesa: 10, poder: 9 }
	},
	{
		nome: "venussauro",
		imagem:	"img/pokemon/Venusaur.gif",
		atributos: { ataque: 12, defesa: 15, poder: 14 }
	},

	{
		nome: "charmander",
		imagem:	"img/pokemon/Charmander.gif",
		atributos: { ataque: 7, defesa: 6, poder: 8 }
	},
	{
		nome: "charmeleon",
		imagem:	"img/pokemon/Charmeleon.gif",
		atributos: { ataque: 10, defesa: 8, poder: 11 }
	},
	{
		nome: "charizard",
		imagem:	"img/pokemon/Charizard.gif",
		atributos: { ataque: 15, defesa: 13, poder: 16 }
	},
	{
		nome: "squirtle",
		imagem:	"img/pokemon/Squirtle.gif",
		atributos: { ataque: 4, defesa: 5, poder: 6 }
	},
	{
		nome: "wartortle",
		imagem:	"img/pokemon/Wartortle.gif",
		atributos: { ataque: 7, defesa: 8, poder: 9 }
	},
	{
		nome: "blastoise",
		imagem:	"img/pokemon/Blastoise.gif",
		atributos: { ataque: 12, defesa: 13, poder: 14 }
	},
	{
		nome: "pidgey",
		imagem:	"img/pokemon/Pidgey.gif",
		atributos: { ataque: 3, defesa: 4, poder: 4 }
	},
	{
		nome: "pidgeotto",
		imagem:	"img/pokemon/Pidgeotto.gif",
		atributos: { ataque: 6, defesa: 7, poder: 7 }
	},
	{
		nome: "pidgeot",
		imagem:	"img/pokemon/Pidgeot.gif",
		atributos: { ataque: 11, defesa: 12, poder: 12 }
	},

	{
		nome: "abra",
		imagem:	"img/pokemon/Abra.gif",
		atributos: { ataque: 6, defesa: 6, poder: 9 }
	},
	{
		nome: "kadabra",
		imagem:	"img/pokemon/Kadabra.gif",
		atributos: { ataque: 9, defesa: 9, poder: 12 }
	},
	{
		nome: "alakazam",
		imagem:	"img/pokemon/Alakazam.gif",
		atributos: { ataque: 14, defesa: 14, poder: 17 }
	}
];
const baralhoRoboOriginal = [
	{	
		nome: "weedle",
		imagem: "img/pokemon/Weedle.gif",
		atributos: { ataque: 4, defesa: 3, poder: 5 }
	},
	{
		nome: "kakuna",
		imagem:	"img/pokemon/Kakuna.gif",
		atributos: { ataque: 0, defesa: 15, poder: 5 }
	},
	{
		nome: "beedrill",
		imagem:	"img/pokemon/Beedrill.gif",
		atributos: { ataque: 15, defesa: 7, poder: 7 }
	},
	{
		nome: "nidoran ♀",
		imagem:	"img/pokemon/Nidoran_F.gif",
		atributos: { ataque: 7, defesa: 6, poder: 4 }
	},
	{
		nome: "nidorina",
		imagem:	"img/pokemon/Nidorina.gif",
		atributos: { ataque: 10, defesa: 8, poder: 8 }
	},
	{
		nome: "nidoqueen",
		imagem:	"img/pokemon/Nidoqueen.gif",
		atributos: { ataque: 15, defesa: 13, poder: 10 }
	},
	{
		nome: "nidoran ♂",
		imagem:	"img/pokemon/Nidoran_M.gif",
		atributos: { ataque: 7, defesa: 6, poder: 4 }
	},
	{
		nome: "nidorino",
		imagem:	"img/pokemon/Nidorino.gif",
		atributos: { ataque: 10, defesa: 8, poder: 8 }
	},
	{
		nome: "nidoking",
		imagem:	"img/pokemon/Nidoking.gif",
		atributos: { ataque: 15, defesa: 13, poder: 10 }
	},
	{
		nome: "poliwag",
		imagem:	"img/pokemon/Poliwag.gif",
		atributos: { ataque: 4, defesa: 4, poder: 6 }
	},
	{
		nome: "poliwhirl",
		imagem:	"img/pokemon/Poliwhirl.gif",
		atributos: { ataque: 7, defesa: 7, poder: 9 }
	},
	{
		nome: "poliwrath",
		imagem:	"img/pokemon/Poliwrath.gif",
		atributos: { ataque: 12, defesa: 12, poder: 14 }
	},

	{
		nome: "machop",
		imagem:	"img/pokemon/Machop.gif",
		atributos: { ataque: 9, defesa: 6, poder: 8 }
	},
	{
		nome: "machoke",
		imagem:	"img/pokemon/Machoke.gif",
		atributos: { ataque: 12, defesa: 9, poder: 11 }
	},
	{
		nome: "machamp",
		imagem:	"img/pokemon/Machamp.gif",
		atributos: { ataque: 17, defesa: 14, poder: 16 }
	}
];
const jogadores = [
	{nome: "jogador",
	 vitorias: 0,
	 empates: 0,
	 derrotas: 0,
	 pontos: 0,
	 imagem: "https://cdn-icons-png.flaticon.com/512/1373/1373255.png"}, 
	{nome: "computador",
	 vitorias: 0,
	 empates: 0,
	 derrotas: 0,
	 pontos: 0,
	 imagem: "https://cdn-icons-png.flaticon.com/512/1720/1720126.png"}
];

let baralhoUsuario = [...baralhoUsuarioOriginal];
let baralhoRobo = [...baralhoRoboOriginal];
let cartaUsuario;
let cartaRobo;

exibirJogadores(jogadores);
exibirRestantes();