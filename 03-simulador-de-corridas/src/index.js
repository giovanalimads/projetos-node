// objeto 1
const player1 = { 
    NOME : "Mario",
    VELOCIDADE : 4,
    MANOBRABILIDADE : 3,
    PODER : 3,
    PONTOS : 0,
};

// objeto 2
const player2 = { 
    NOME : "Luigi",
    VELOCIDADE : 3,
    MANOBRABILIDADE : 4,
    PODER : 4,
    PONTOS : 0,
};

// rolagem do dado
async function rollDice(){
    return Math.floor(Math.random() * 6) + 1; 
};

async function getRandomBlock(){
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }
    return result;
};

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block}: ${diceResult} + ${attribute} = ${diceResult + attribute}`);
};

function getRandomItem() {
    const random = Math.random();
    if (random < 0.2) return "TURBO";
    if (random < 0.4) return "CASCO";
    if (random < 0.6) return "BANANA";
    return null;
}

// motor do jogo
async function playRaceEngine(character1, character2){
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);

        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA"){
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);

            // Itens surpresa
            let item1 = getRandomItem();
            let item2 = getRandomItem();

            if (item1 === "TURBO") {
                console.log(`${character1.NOME} pegou um TURBO! +2 no total 🚀`);
                totalTestSkill1 += 2;
            }
            if (item2 === "TURBO") {
                console.log(`${character2.NOME} pegou um TURBO! +2 no total 🚀`);
                totalTestSkill2 += 2;
            }
            if (item1 === "CASCO") {
                console.log(`${character1.NOME} lançou um CASCO! ${character2.NOME} perde 1 no total 🐢`);
                totalTestSkill2 = Math.max(0, totalTestSkill2 - 1);
            }
            if (item2 === "CASCO") {
                console.log(`${character2.NOME} lançou um CASCO! ${character1.NOME} perde 1 no total 🐢`);
                totalTestSkill1 = Math.max(0, totalTestSkill1 - 1);
            }
            if (item1 === "BANANA") {
                console.log(`${character1.NOME} escorregou na BANANA! -1 no total 🍌`);
                totalTestSkill1 = Math.max(0, totalTestSkill1 - 1);
            }
            if (item2 === "BANANA") {
                console.log(`${character2.NOME} escorregou na BANANA! -1 no total 🍌`);
                totalTestSkill2 = Math.max(0, totalTestSkill2 - 1);
            }
        }

        if(block === "CURVA"){
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);

            // Itens surpresa
            let item1 = getRandomItem();
            let item2 = getRandomItem();

            if (item1 === "TURBO") {
                console.log(`${character1.NOME} pegou um TURBO! +2 no total 🚀`);
                totalTestSkill1 += 2;
            }
            if (item2 === "TURBO") {
                console.log(`${character2.NOME} pegou um TURBO! +2 no total 🚀`);
                totalTestSkill2 += 2;
            }
            if (item1 === "CASCO") {
                console.log(`${character1.NOME} lançou um CASCO! ${character2.NOME} perde 1 no total 🐢`);
                totalTestSkill2 = Math.max(0, totalTestSkill2 - 1);
            }
            if (item2 === "CASCO") {
                console.log(`${character2.NOME} lançou um CASCO! ${character1.NOME} perde 1 no total 🐢`);
                totalTestSkill1 = Math.max(0, totalTestSkill1 - 1);
            }
            if (item1 === "BANANA") {
                console.log(`${character1.NOME} escorregou na BANANA! -1 no total 🍌`);
                totalTestSkill1 = Math.max(0, totalTestSkill1 - 1);
            }
            if (item2 === "BANANA") {
                console.log(`${character2.NOME} escorregou na BANANA! -1 no total 🍌`);
                totalTestSkill2 = Math.max(0, totalTestSkill2 - 1);
            }
        }

        if(block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

            if(powerResult1 > powerResult2 && character2.PONTOS > 0){
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`);
                character2.PONTOS--;
            }
            if(powerResult2 > powerResult1 && character1.PONTOS > 0){
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`);
                character1.PONTOS--;
            }
            if(powerResult1 === powerResult2){
                console.log("Confronto empatado! Nenhum ponto foi perdido");
            }
        }

        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou 1 ponto!`);
            character1.PONTOS++;
        } else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.NOME} marcou 1 ponto!`);
            character2.PONTOS++;
        }

        console.log("-----------------------------");
    }
}

// função que declara o vencedor 
async function declareWinner(character1, character2) {
    console.log("Resultado final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if(character1.PONTOS > character2.PONTOS){
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
    } else if(character2.PONTOS > character1.PONTOS){
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
    } else {
        console.log("A corrida terminou em empate");
    }
}

// função autoinvocável
(async function main(){
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();