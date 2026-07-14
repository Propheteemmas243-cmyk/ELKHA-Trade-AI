async function scanMarket(){

const box = document.getElementById("signal");

box.innerHTML = "🧠 ELKHA CORE analyse le marché...";


const capital = Number(document.getElementById("capital").value || 100);

const percentage = Number(document.getElementById("percentage").value || 100);


const tradeCapital = capital * percentage / 100;

const targetGain = tradeCapital * 0.10;

const maxLoss = tradeCapital * 0.03;



if(document.getElementById("tradeAmount")){
document.getElementById("tradeAmount").innerHTML =
tradeCapital.toFixed(2)+" USDT";
}


if(document.getElementById("protectedAmount")){
document.getElementById("protectedAmount").innerHTML =
(capital-tradeCapital).toFixed(2)+" USDT";
}



const cryptos = [

{id:"bitcoin",name:"BTC/USDT"},
{id:"ethereum",name:"ETH/USDT"},
{id:"solana",name:"SOL/USDT"},
{id:"binancecoin",name:"BNB/USDT"},
{id:"ripple",name:"XRP/USDT"}

];



const ids = cryptos.map(c=>c.id).join(",");



try{


const response = await fetch(

`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`

);


const data = await response.json();



let result =
"🧠 ELKHA STRATEGY REPORT<br><br>";



cryptos.forEach(coin=>{


const price =
data[coin.id].usd;


const change =
data[coin.id].usd_24h_change;



let score = 50;



if(change > 5){

score += 30;

}

else if(change > 2){

score += 20;

}

else if(change > 0){

score += 10;

}

else if(change < -5){

score -= 30;

}

else if(change < 0){

score -= 15;

}



if(score > 100) score = 100;

if(score < 0) score = 0;



let trend;

if(change > 0){

trend = "📈 Haussière";

}

else{

trend = "📉 Baissière";

}



let risk;


if(Math.abs(change) > 5){

risk = "🔴 Élevé";

}

else if(Math.abs(change) > 2){

risk = "🟡 Modéré";

}

else{

risk = "🟢 Faible";

}



let decision;



if(score >= 80 && risk !== "🔴 Élevé"){

decision =
"🟢 CONFIGURATION INTÉRESSANTE";

}

else if(score >= 60){

decision =
"🟡 ATTENDRE CONFIRMATION";

}

else{

decision =
"🔴 ÉVITER";

}



result += `


<b>${coin.name}</b><br><br>


💵 Prix :
${price}$<br>


📊 Variation 24h :
${change.toFixed(2)}%<br>


${trend}<br><br>


🧠 Score ELKHA :
${score}/100<br>


⚠️ Risque :
${risk}<br><br>


🎯 Décision :
${decision}<br><br>


💰 Capital engagé :
${tradeCapital.toFixed(2)} USDT<br>


🎯 Objectif simulé :
+${targetGain.toFixed(2)} USDT<br>


🛡 Protection :
-${maxLoss.toFixed(2)} USDT


<br>

--------------------

<br><br>


`;



});



box.innerHTML = result;



}


catch(error){

box.innerHTML =
"⚠️ Erreur de connexion au marché";

console.log(error);

}


}
