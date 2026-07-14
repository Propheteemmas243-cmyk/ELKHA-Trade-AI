async function scanMarket(){


const signalBox =
document.getElementById("signal");


const capital =
Number(document.getElementById("capital").value);


const percentage =
Number(document.getElementById("percentage").value);



const tradeAmount =
capital * percentage /100;


const protectedAmount =
capital - tradeAmount;



document.getElementById("tradeAmount").innerHTML =
tradeAmount.toFixed(2)+" USDT";


document.getElementById("protectedAmount").innerHTML =
protectedAmount.toFixed(2)+" USDT";



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


const market =
data[coin.id];


const change =
market.usd_24h_change;



let score = 50;



if(change > 5)
score +=30;

else if(change >2)
score +=20;

else if(change < -5)
score -=30;

else if(change < -2)
score -=20;



if(score>100)
score=100;


if(score<0)
score=0;



let decision;


let gainPercent;



if(score>=80){

decision="🟢 Opportunité";

gainPercent=2;

}

else if(score>=60){

decision="🟡 Surveillance";

gainPercent=1;

}

else{

decision="🔴 Risque";

gainPercent=0;

}



let estimatedGain =
tradeAmount * gainPercent /100;



result += `


<b>${coin.name}</b><br>

Variation :
${change.toFixed(2)}%<br>

Score ELKHA :
${score}/100<br>

Décision :
${decision}<br>


💰 Capital engagé :
${tradeAmount.toFixed(2)} USDT<br>


📈 Gain estimé :
+${estimatedGain.toFixed(2)} USDT


<br>

------------------

<br><br>


`;



});



signalBox.innerHTML=result;



}

catch(error){


signalBox.innerHTML =
"⚠️ Erreur de connexion";


console.log(error);


}


}
