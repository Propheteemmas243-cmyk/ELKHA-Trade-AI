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



const response = await fetch(
"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,ripple&vs_currencies=usd&include_24hr_change=true"
);


const data = await response.json();



let result = `
🧠 ELKHA STRATEGY REPORT<br><br>
`;



const coins = [
["bitcoin","BTC/USDT"],
["ethereum","ETH/USDT"],
["solana","SOL/USDT"],
["binancecoin","BNB/USDT"],
["ripple","XRP/USDT"]
];



coins.forEach(coin=>{


let price = data[coin[0]].usd;
let change = data[coin[0]].usd_24h_change;



let score = 50;


if(change > 5){
score = 85;
}
else if(change > 2){
score = 75;
}
else if(change > 0){
score = 65;
}
else{
score = 40;
}



let trend = change >=0 ? "📈 Haussière" : "📉 Baissière";


let risk;

if(Math.abs(change)>5){
risk="🔴 Élevé";
}
else if(Math.abs(change)>2){
risk="🟡 Modéré";
}
else{
risk="🟢 Faible";
}



let decision;


if(score>=80){
decision="🟢 CONFIGURATION INTÉRESSANTE";
}
else if(score>=60){
decision="🟡 ATTENDRE CONFIRMATION";
}
else{
decision="🔴 ÉVITER";
}



let gain = tradeCapital * 0.10;
let loss = tradeCapital * 0.03;



result += `

<b>${coin[1]}</b><br>

💵 Prix :
${price}$<br>

📊 Variation :
${change.toFixed(2)}%<br>

${trend}<br>

🧠 Score ELKHA :
${score}/100<br>

⚠️ Risque :
${risk}<br>

🎯 Décision :
${decision}<br>

💰 Gain simulé :
+${gain.toFixed(2)} USDT<br>

🛡 Protection :
-${loss.toFixed(2)} USDT

<br>

--------------------

<br><br>

`;



});



box.innerHTML=result;


}
