async function scanMarket(){

const box = document.getElementById("signal");

box.innerHTML = "🧠 ELKHA CORE analyse le marché...";


const capital = Number(document.getElementById("capital").value || 100);

const percentage = Number(document.getElementById("percentage").value || 100);


const tradeCapital = capital * percentage / 100;

const protectedCapital = capital - tradeCapital;


if(document.getElementById("tradeAmount")){
document.getElementById("tradeAmount").innerHTML =
tradeCapital.toFixed(2)+" USDT";
}


if(document.getElementById("protectedAmount")){
document.getElementById("protectedAmount").innerHTML =
protectedCapital.toFixed(2)+" USDT";
}



const cryptos = [

{id:"bitcoin", name:"BTC/USDT"},
{id:"ethereum", name:"ETH/USDT"},
{id:"solana", name:"SOL/USDT"},
{id:"binancecoin", name:"BNB/USDT"},
{id:"ripple", name:"XRP/USDT"}

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


const price = data[coin.id].usd;

const change = data[coin.id].usd_24h_change;



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

else if(change < -2){

score -= 20;

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

risk = "⚠️ Élevé";

}

else if(Math.abs(change) > 2){

risk = "🟡 Modéré";

}

else{

risk = "🟢 Faible";

}



let decision;


if(score >= 80){

decision = "🟢 Configuration intéressante";

}

else if(score >= 60){

decision = "🟡 Attendre confirmation";

}

else{

decision = "🔴 Éviter";

}



let targetGain = 0;


if(score >= 80){

targetGain = tradeCapital * 0.10;

}

else if(score >= 60){

targetGain = tradeCapital * 0.05;

}



result += `


<b>${coin.name}</b><br>

💵 Prix :
${price}$<br>

📊 Variation 24h :
${change.toFixed(2)}%<br>

${trend}<br>

🧠 Score ELKHA :
${score}/100<br>

⚠️ Risque :
${risk}<br>

🎯 Décision :
${decision}<br>

💰 Gain simulé :
+${targetGain.toFixed(2)} USDT


<br>

--------------------<br><br>


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
