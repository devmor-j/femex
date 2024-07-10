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
  <PhemexOrderbook :book="orderbookComputed" />
</template>

<style></style>
