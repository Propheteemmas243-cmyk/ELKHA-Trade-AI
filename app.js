async function scanMarket() {

    const signalBox = document.getElementById("signal");

    signalBox.innerHTML = "🧠 ELKHA CORE analyse le marché en temps réel...";


    const cryptos = [
        {
            id: "bitcoin",
            name: "BTC/USDT"
        },
        {
            id: "ethereum",
            name: "ETH/USDT"
        },
        {
            id: "solana",
            name: "SOL/USDT"
        },
        {
            id: "binancecoin",
            name: "BNB/USDT"
        },
        {
            id: "ripple",
            name: "XRP/USDT"
        }
    ];


    const ids = cryptos.map(coin => coin.id).join(",");


    try {

        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
        );


        const data = await response.json();


        let result = `
        🧠 ELKHA MARKET SCAN<br><br>
        `;


        cryptos.forEach(coin => {

            const market = data[coin.id];

            const price = market.usd;

            const change = market.usd_24h_change.toFixed(2);


            let trend;
            let score;


            if (change > 2) {

                trend = "📈 HAUSSIÈRE";

                score = 85;

            } else if (change < -2) {

                trend = "📉 BAISSIÈRE";

                score = 45;

            } else {

                trend = "⏸ STABLE";

                score = 65;

            }


            result += `
            <b>${coin.name}</b><br>
            Prix : ${price}$<br>
            Variation 24h : ${change}%<br>
            Tendance : ${trend}<br>
            Score ELKHA : ${score}/100<br>
            --------------------<br><br>
            `;


        });


        signalBox.innerHTML = result;


    } catch(error) {

        signalBox.innerHTML =
        "⚠️ Impossible de récupérer les données du marché";

        console.log(error);

    }

}
