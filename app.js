function updateCapital(){


let capital =
Number(document.getElementById("capital").value);


let percentage =
Number(document.getElementById("percentage").value);


let target =
Number(document.getElementById("target").value);


let risk =
Number(document.getElementById("risk").value);



let trade =
capital * percentage / 100;


let gain =
trade * target / 100;


let total =
trade + gain;


let loss =
trade * risk / 100;



document.getElementById("tradeAmount").innerHTML =
trade.toFixed(2)+" USDT";


document.getElementById("targetGain").innerHTML =
"+"+gain.toFixed(2)+" USDT";


document.getElementById("targetTotal").innerHTML =
total.toFixed(2)+" USDT";


document.getElementById("maxLoss").innerHTML =
"-"+loss.toFixed(2)+" USDT";

}





async function scanMarket(){


updateCapital();


let box =
document.getElementById("signal");


box.innerHTML =
"🧠 ELKHA CORE analyse...";



let response =
await fetch(
"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,ripple&vs_currencies=usd&include_24hr_change=true"
);



let data =
await response.json();



let result =
"🧠 ELKHA MARKET SCAN<br><br>";



let coins = [

["bitcoin","BTC/USDT"],
["ethereum","ETH/USDT"],
["solana","SOL/USDT"],
["binancecoin","BNB/USDT"],
["ripple","XRP/USDT"]

];



coins.forEach(c=>{


let coin =
data[c[0]];


let change =
coin.usd_24h_change;


let score = 50;


if(change > 2){

score += 30;

}

if(change < -2){

score -= 20;

}


result +=

"<b>"+c[1]+"</b><br>"+
"Prix : "+coin.usd+"$<br>"+
"Variation : "+change.toFixed(2)+"%<br>"+
"Score ELKHA : "+score+"/100<br><br>";



});



box.innerHTML=result;



}





document.getElementById("scanButton").onclick =
scanMarket;
