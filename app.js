function updateCapital(){


const capital =
Number(document.getElementById("capital").value);


const percentage =
Number(document.getElementById("percentage").value);


const target =
Number(document.getElementById("target").value);


const risk =
Number(document.getElementById("risk").value);



const tradeAmount =
capital * percentage /100;


const gain =
tradeAmount * target /100;


const finalAmount =
tradeAmount + gain;


const loss =
tradeAmount * risk /100;



document.getElementById("tradeAmount").innerHTML =
tradeAmount.toFixed(2)+" USDT";


document.getElementById("targetGain").innerHTML =
"+"+gain.toFixed(2)+" USDT";


document.getElementById("targetTotal").innerHTML =
finalAmount.toFixed(2)+" USDT";


document.getElementById("maxLoss").innerHTML =
"-"+loss.toFixed(2)+" USDT";

}





async function scanMarket(){


updateCapital();



const signalBox =
document.getElementById("signal");



signalBox.innerHTML =
"🧠 ELKHA analyse les marchés...";



const cryptos=[

{id:"bitcoin",name:"BTC/USDT"},
{id:"ethereum",name:"ETH/USDT"},
{id:"solana",name:"SOL/USDT"},
{id:"binancecoin",name:"BNB/USDT"},
{id:"ripple",name:"XRP/USDT"}

];



const ids =
cryptos.map(c=>c.id).join(",");



try{


const response =
await fetch(
`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
);


const data =
await response.json();



let result =
"🧠 ELKHA MARKET SCAN<br><br>";



cryptos.forEach(coin=>{


const change =
data[coin.id].usd_24h_change;



let score = 50;


if(change>5)
score+=30;

else if(change>2)
score+=20;

else if(change<-5)
score-=30;



if(score>100)
score=100;


let decision;


if(score>=80)
decision="🟢 Configuration intéressante";

else if(score>=60)
decision="🟡 Attendre confirmation";

else
decision="🔴 Risque élevé";



result += `

<b>${coin.name}</b><br>

Variation :
${change.toFixed(2)}%<br>

Score ELKHA :
${score}/100<br>

${decision}

<br><br>

`;



});



signalBox.innerHTML=result;



}

catch(error){

signalBox.innerHTML=
"⚠️ Erreur marché";

}


}
