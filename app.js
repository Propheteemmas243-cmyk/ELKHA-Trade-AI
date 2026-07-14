async function scanMarket(){

const box = document.getElementById("signal");

box.innerHTML = "🧠 ELKHA STRATEGY ENGINE analyse le marché...";


const capital = Number(document.getElementById("capital").value || 100);

const percentage = Number(document.getElementById("percentage").value || 100);

const tradeCapital = capital * percentage / 100;



const cryptos = [
{ id:"bitcoin", name:"BTC/USDT" },
{ id:"ethereum", name:"ETH/USDT" },
{ id:"solana", name:"SOL/USDT" },
{ id:"binancecoin", name:"BNB/USDT" },
{ id:"ripple", name:"XRP/USDT" }
];



const ids = cryptos.map(c => c.id).join(",");



try{


const response = await fetch(
`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
);


const data = await response.json();



let result = "🧠 ELKHA STRATEGY REPORT<br><br>";



cryptos.forEach(coin=>{


const price = data[coin.id].usd;

const change = data[coin.id].usd_24h_change;



let score = 50;



if(change > 5){

score += 30;

}

else if(change > 2){

score += 20;

}

else if(change < -5){

score -= 30;

}

else if(change < -2){

score -= 20;

}



if(score > 100){
score = 100;
}


if(score < 0){
score = 0;
}



let decision;

let target;

let gain;



if(score >= 80){

decision = "🟢 SIGNAL ACHAT POSSIBLE";

target = "+10% objectif";

gain = tradeCapital * 0.10;

}


else if(score >= 60){

decision = "🟡 ATTENDRE CONFIRMATION";

target = "+5% objectif";

gain = tradeCapital * 0.05;

}


else{

decision = "🔴 ÉVITER";

target = "Pas de trade";

gain = 0;

}



result += `

<b>${coin.name}</b><br>

Prix :
${price}$<br>

Variation :
${change.toFixed(2)}%<br>

🧠 Score ELKHA :
${score}/100<br>

Décision :
${decision}<br>

🎯 Objectif :
${target}<br>

💰 Gain simulé :
+${gain.toFixed(2)} USDT<br>

--------------------<br><br>

`;



});



box.innerHTML = result;



}

catch(error){

box.innerHTML =
"⚠️ ELKHA ne peut pas récupérer les données du marché";

console.log(error);

}


}



// Activation automatique du bouton

document.addEventListener("DOMContentLoaded",()=>{


const button = document.getElementById("scanButton");


if(button){

button.onclick = scanMarket;

}


});
