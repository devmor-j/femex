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
  <div class="container mx-auto">
    <div
      class="flex items-start justify-center flex-wrap gap-16 max-h-96 my-16"
    >
      <PhemexOrderbook :book="orderbookComputed" />
      <PhemexRecentTrades :trades="tradesComputed" />
    </div>
  </div>
</template>

<style></style>
