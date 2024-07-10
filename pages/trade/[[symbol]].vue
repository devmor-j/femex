<script setup>
const route = useRoute();

if (!route.params.symbol) navigateTo(route.path + "BTCUSD");

const symbolComputed = computed(() => route.params.symbol?.toUpperCase());

const { orderbookComputed, tradesComputed, connect, disconnect } =
  usePhemexContractWebSocket({ symbol: symbolComputed.value });

onMounted(connect);
onUnmounted(disconnect);
</script>

<template>
  <div class="container">
    <PhemexOrderbook :book="orderbookComputed" />
    <PhemexRecentTrades :trades="tradesComputed" />
  </div>
</template>

<style></style>
