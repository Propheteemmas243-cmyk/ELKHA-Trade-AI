function scanMarket() {

    const signals = [
        "🟢 BTC/USDT : Opportunité détectée - Analyse favorable",
        "🔵 ETH/USDT : Surveillance active - Confirmation nécessaire",
        "🟣 SOL/USDT : Volatilité élevée - Prudence recommandée",
        "🟡 BNB/USDT : Configuration intéressante détectée",
        "⏸ Aucun trade recommandé - Marché en attente"
    ];


    const randomSignal =
    signals[Math.floor(Math.random() * signals.length)];


    document.getElementById("signal").innerHTML =
    randomSignal;

}
