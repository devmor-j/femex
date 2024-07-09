export default function ({ symbol = "BTCUSD" } = {}) {
  const orderbookRef = ref({ asks: [], bids: [] });
  const tradeRef = ref([[]]);

  const onMessage = {
    orderbook: (msg) => {
      if (msg.type === "snapshot") {
        orderbookRef.value = msg.book;
      } else if (msg.type === "incremental") {
        // TODO: update orderbookRef
      }
    },
    trade: (msg) => {
      if (msg.type === "snapshot") {
        tradeRef.value = msg.trades;
      } else if (msg.type === "incremental") {
        // TODO: update tradesRef
      }
    },
  };

  const connect = () => {
    const ws = new WebSocket("wss://ws.phemex.com");

    ws.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data);

      if (!("error" in msg)) {
        if ("book" in msg) onMessage.orderbook(msg);
        else if ("trades" in msg) onMessage.trade(msg);
      } else {
        // TODO: handle error (maybe toast bad network or reconnect)
      }
    });

    ws.addEventListener("open", () => {
      const pingMsg = JSON.stringify({
        id: 0,
        method: "server.ping",
        params: [],
      });

      setInterval(() => {
        ws.send(pingMsg);
      }, 5_000);

      ws.send(
        JSON.stringify({
          id: 1,
          method: "orderbook.subscribe",
          params: [symbol],
        })
      );

      ws.send(
        JSON.stringify({
          id: 2,
          method: "trade.subscribe",
          params: [symbol],
        })
      );
    });
  };

  return { orderbookRef, tradeRef, connect };
}
