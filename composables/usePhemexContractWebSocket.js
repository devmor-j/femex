// TODO: extract to utility
const toUnScaledNumbers = (n) => {
  const price = n[0] / 1e4;
  return [price, Math.floor(1e4 * (n[1] / price)) / 1e4];
};

export default function ({ symbol = "BTCUSD" } = {}) {
  const orderbookRef = ref({ asks: [], bids: [] });
  const tradesRef = ref([[]]);

  const orderbookComputed = computed(() => ({
    asks: orderbookRef.value.asks.map(toUnScaledNumbers).reverse().slice(20),
    bids: orderbookRef.value.bids.map(toUnScaledNumbers).slice(0, 10),
  }));
  const tradesComputed = computed(() => tradesRef.value);

  const onMessage = {
    orderbook: (msg) => {
      if (msg.type === "snapshot") {
        orderbookRef.value = msg.book;
      } else if (msg.type === "incremental") {
        for (const ask of msg.book.asks) {
          if (ask[1] === 0) {
            for (const [index, oAsk] of orderbookRef.value.asks.entries()) {
              if (ask[0] === oAsk[0]) {
                orderbookRef.value.asks.splice(index, 1); // deletion
                break;
              }
            }
          } else {
            if (ask[0] > orderbookRef.value.asks.at(-1)[0]) {
              orderbookRef.value.asks.push(ask); // last insertion
            } else {
              for (const [index, oAsk] of orderbookRef.value.asks.entries()) {
                if (ask[0] === oAsk[0]) {
                  orderbookRef.value.asks[index][1] = ask[1]; // updation
                  break;
                } else if (ask[0] < oAsk[0]) {
                  orderbookRef.value.asks.splice(index, 0, ask); // insertion
                  break;
                }
              }
            }
          }
        }

        for (const bid of msg.book.bids) {
          if (bid[1] === 0) {
            for (const [index, oBid] of orderbookRef.value.bids.entries()) {
              if (bid[0] === oBid[0]) {
                orderbookRef.value.bids.splice(index, 1); // deletion
                break;
              }
            }
          } else {
            if (bid[0] < orderbookRef.value.bids.at(-1)[0]) {
              orderbookRef.value.bids.push(bid); // last insertion
            } else {
              for (const [index, oBid] of orderbookRef.value.bids.entries()) {
                if (bid[0] === oBid[0]) {
                  orderbookRef.value.bids[index][1] = bid[1]; // updation
                  break;
                } else if (bid[0] > oBid[0]) {
                  orderbookRef.value.bids.splice(index, 0, bid); // insertion
                  break;
                }
              }
            }
          }
        }
      }
    },
    trades: (msg) => {
      if (msg.type === "snapshot") {
        tradesRef.value = msg.trades;
      } else if (msg.type === "incremental") {
        // TODO: update tradeRef
      }
    },
  };

  const onError = {
    6001: (msg) => {
      // "invalid argument"
      disconnect();
      symbol = "BTCUSD";
      connect();
    },
  };

  /** @type {WebSocket} */
  let ws;

  const disconnect = () => {
    if (ws) ws.close();
  };

  const connect = () => {
    ws = new WebSocket("wss://ws.phemex.com");

    ws.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data);

      if (!("error" in msg)) {
        // socket data messages
        if ("book" in msg) onMessage.orderbook(msg);
        else if ("trades" in msg) onMessage.trades(msg);
      } else if (msg.error !== null) {
        // socket error messages with code
        onError[msg.error.code]?.(msg);
      } else {
        // socket non-error messages like PONG and INFO
      }
    });

    ws.addEventListener("open", () => {
      console.log(`[33mWS OPEN[0m`);

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

  return { orderbookComputed, tradesComputed, disconnect, connect };
}
