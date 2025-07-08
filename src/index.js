const player1 = {
    NOME: "Mario",
    PONTOS: 0,
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3
};
const player2 = {
    NOME: "Peach",
    PONTOS: 0,
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2
};
const player3 = {
    NOME: "Yoshi",
    PONTOS: 0,
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3
};
const player4 = {
    NOME: "Bowser",
    PONTOS: 0,
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5
};
const player5 = {
    NOME: "Luigi",
    PONTOS: 0,
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4
};
const player6 = {
    NOME: "Donkey Kong",
    PONTOS: 0,
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5
};

//Rolar dados para determinar valor aleatorio

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case (random < 0.33):
            result = "RETA";
            break;
        case (random < 0.66):
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
        
    }
    return result;
};

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`🎲 ${characterName} rolou o dado de ${block} e obteve ${diceResult} + ${attribute} = ${diceResult + attribute}.`);
   
}

async function playeRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++) {
        console.log(`--------------🏁 Rodada ${round}----------------`);

        //Sortear blocos
        let block = await getRandomBlock();
        console.log(`🏎️ Bloco: ${block}`);

        //Roll dice
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //Test Skill
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA") {
            totalTestSkill1 = character1.VELOCIDADE + diceResult1;
            totalTestSkill2 = character2.VELOCIDADE + diceResult2;

            await logRollResult(character1.NOME, "VELOCIDADE", diceResult1, character1.VELOCIDADE );
            await logRollResult(character2.NOME, "VELOCIDADE", diceResult2, character2.VELOCIDADE );

        }
        if(block === "CURVA") {
            totalTestSkill1 = character1.MANOBRABILIDADE + diceResult1;
            totalTestSkill2 = character2.MANOBRABILIDADE + diceResult2;
            
            await logRollResult(character1.NOME, "MANOBRABILIDADE", diceResult1, character1.MANOBRABILIDADE );
            await logRollResult(character2.NOME, "MANOBRABILIDADE", diceResult2, character2.MANOBRABILIDADE );

        }
        if(block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;
            
            console.log(`💥 ${character1.NOME} confrontou com  ${character2.NOME}!`);

            await logRollResult(character1.NOME, "PODER", diceResult1, character1.PODER );
            await logRollResult(character2.NOME, "PODER", diceResult2, character2.PODER );

            if(powerResult1 > powerResult2 && character2.PONTOS > 0) {
                character2.PONTOS--;
                console.log(`💪 ${character1.NOME} venceu o confronto!`);
                console.log(`❌ ${character2.NOME} perdeu 1 ponto!`);
                
            }
            if(powerResult2 > powerResult1 && character1.PONTOS > 0) {
                character1.PONTOS--;
                console.log(`💪 ${character2.NOME} venceu o confronto!`);
                console.log(`❌ ${character1.NOME} perdeu 1 ponto!`);
            } 
            if(powerResult1 === powerResult2) {
                console.log(`🤝 Empate no confronto! ninguém perdeu ponto`);
            }
            
            
        }

        //verificando o vencedor da rodada
        if(totalTestSkill1 > totalTestSkill2) {
            character1.PONTOS++;
            console.log(`🏆 ${character1.NOME} venceu a rodada e marcou 1 ponto!`);
        } else if(totalTestSkill2 > totalTestSkill1) {
            character2.PONTOS++;
            console.log(`🏆 ${character2.NOME} venceu a rodada e marcou 1 ponto!`);
        } else {
            console.log(`🤝 Empate na rodada! Nenhum ponto para ${character1.NOME} e ${character2.NOME}.`);
        }

    }

};

async function declareWinner(character1, character2) {
    console.log(`---------------------------------`);
    console.log(`🏁🏆 Fim da corrida!`);
    console.log(`🏁 ${character1.NOME} - Pontos: ${character1.PONTOS}`);
    console.log(`🏁 ${character2.NOME} - Pontos: ${character2.PONTOS}`);

    if(character1.PONTOS > character2.PONTOS) {
        console.log(`🎉 ${character1.NOME} é o grande vencedor!`);
    } else if(character2.PONTOS > character1.PONTOS) {
        console.log(`🎉 ${character2.NOME} é o grande vencedor!`);
    } else {
        console.log(`🤝 Empate! Nenhum vencedor.`);
    }
}

//autoinvoked function to start the game
(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`);
    
    await playeRaceEngine(player1, player2);
    await declareWinner(player1, player2);

})();
