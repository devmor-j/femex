<script setup>
const route = useRoute();

if (!route.params.symbol) {
  if (route.path.at(-1) === "/") {
    navigateTo(route.path + "BTCUSD");
  } else navigateTo(route.path + "/BTCUSD");
}

const symbolComputed = computed(() => route.params.symbol?.toUpperCase());

const { orderbookComputed, tradesComputed, connect, disconnect } =
  usePhemexContractWebSocket({ symbol: symbolComputed.value });

const lastTradeComputed = computed(() => ({
  price: tradesComputed.value[0]?.[2],
  isBuy: tradesComputed.value[0]?.[1],
}));

onMounted(connect);
onUnmounted(disconnect);
</script>

<template>
  <div class="container mx-auto px-8">
    <main class="flex flex-col items-start gap-16 max-h-96 my-16">
      <button class="btn group">
        <NuxtLink to="/">
          <small class="arrow reverse">&#129144;</small>
          Homepage
        </NuxtLink>
      </button>

      <BaseTabs>
        <PhemexOrderbook
          base-tabs-title="Order Book"
          :book="orderbookComputed"
          :last-trade="lastTradeComputed"
        />
        <PhemexRecentTrades
          base-tabs-title="Recent Trades"
          :trades="tradesComputed"
        />
      </BaseTabs>
    </main>
  </div>
</template>
