async function scanMarket() {

    const signalBox = document.getElementById("signal");

    signalBox.innerHTML = "🧠 ELKHA CORE analyse les marchés...";


    const cryptos = [
        { id: "bitcoin", name: "BTC/USDT" },
        { id: "ethereum", name: "ETH/USDT" },
        { id: "solana", name: "SOL/USDT" },
        { id: "binancecoin", name: "BNB/USDT" },
        { id: "ripple", name: "XRP/USDT" }
    ];


    const ids = cryptos.map(c => c.id).join(",");


    try {

        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
        );


        const data = await response.json();


        let result = `
        🧠 ELKHA MARKET ANALYSIS<br><br>
        `;


        cryptos.forEach(coin => {


            const market = data[coin.id];

            const price = market.usd;

            const change = market.usd_24h_change;


            // Calcul du Score ELKHA

            let score = 50;


            // Analyse momentum
            if(change > 5){
                score += 25;
            }
            else if(change > 2){
                score += 15;
            }
            else if(change < -5){
                score -= 25;
            }
            else if(change < -2){
                score -= 15;
            }


            // Analyse stabilité
            if(Math.abs(change) < 3){
                score += 10;
            }


            // Limite du score
            if(score > 100){
                score = 100;
            }

            if(score < 0){
                score = 0;
            }



            let decision;


            if(score >= 80){

                decision = "🟢 Opportunité intéressante";

            }
            else if(score >= 60){

                decision = "🟡 Surveillance";

            }
            else {

                decision = "🔴 Risque élevé";

            }



            result += `

            <b>${coin.name}</b><br>

            Prix :
            ${price}$<br>

            Variation 24h :
            ${change.toFixed(2)}%<br>

            🧠 Score ELKHA :
            ${score}/100<br>

            Décision :
            ${decision}<br>

            --------------------<br><br>

            `;


        });



        signalBox.innerHTML = result;



    } catch(error){


        signalBox.innerHTML =
        "⚠️ Impossible d'analyser le marché";


        console.log(error);


    }

}
