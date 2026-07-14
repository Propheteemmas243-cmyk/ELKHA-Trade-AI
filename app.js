console.log("ELKHA VERSION NOUVELLE CHARGEE");


async function scanMarket(){


let signal =
document.getElementById("signal");


signal.innerHTML =
"🧠 ELKHA analyse en cours...";



let capital =
Number(document.getElementById("capital").value);



let percentage =
Number(document.getElementById("percentage").value);



let trade =
capital * percentage /100;



document.getElementById("tradeAmount").innerHTML =
trade.toFixed(2)+" USDT";



let response =
await fetch(
"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true"
);



let data =
await response.json();



let result =
"🧠 ELKHA MARKET REPORT<br><br>";



let coins = [

["bitcoin","BTC/USDT"],
["ethereum","ETH/USDT"],
["solana","SOL/USDT"]

];



coins.forEach(c=>{


let price =
data[c[0]].usd;


let variation =
data[c[0]].usd_24h_change;



let score = 50;



if(variation > 2){

score = 80;

}


if(variation < -2){

score = 30;

}



let decision;


if(score >=80){

decision =
"🟢 SIGNAL ACHAT POSSIBLE";

}

else if(score >=50){

decision =
"🟡 SURVEILLER";

}

else{

decision =
"🔴 ÉVITER";

}



result += `

<b>${c[1]}</b><br>

Prix : ${price}$<br>

Variation : ${variation.toFixed(2)}%<br>

Score ELKHA : ${score}/100<br>

Décision : ${decision}

<br><br>

`;



});



signal.innerHTML =
result;



}



document.addEventListener(
"DOMContentLoaded",
function(){


document.getElementById("scanButton").onclick =
scanMarket;


}
);
