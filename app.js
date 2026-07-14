async function scanMarket() {

    const signalBox = document.getElementById("signal");

    signalBox.innerHTML = "🧠 ELKHA CORE analyse le marché...";


    const cryptos = [
        "bitcoin",
        "ethereum",
        "solana",
        "binancecoin",
        "ripple"
    ];


    try {

        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=" 
            + cryptos.join(",") +
            "&vs_currencies=usd&include_24hr_change=true"
        );


        const data = await response.json();


        let result = "🧠 ELKHA MARKET SCAN<br><br>";


        cryptos.forEach((crypto)=>{

            let coin = data[crypto];

            let price = coin.usd;

            let change = coin.usd_24h_change.toFixed(2);


            let trend;

            let score;


            if(change > 2){

                trend = "📈 HAUSSIÈRE";

                score = 80 + Math.floor(Math.random()*15);

            } 
            else if(change < -2){

                trend = "📉 BAISSIÈRE";

                score = 40 + Math.floor(Math.random()*20);

            } 
            else {

                trend = "⏸ STABLE";

                score = 60 + Math.floor(Math.random()*15);

            }


            result += `
            <b>${crypto.toUpperCase()}</b><br>
            Prix : ${price}$<br>
            Variation 24h : ${change}%<br>
            Tendance : ${trend}<br>
            Score ELKHA : ${score}/100<br><br>
            `;


        });


        signalBox.innerHTML = result;


    } catch(error){

        signalBox.innerHTML =
        "⚠️ Erreur de connexion au marché";

        console.log(error);

    }

}
