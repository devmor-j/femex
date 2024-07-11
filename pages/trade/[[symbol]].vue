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
    <div class="flex items-start flex-wrap gap-16 max-h-96 my-16">
      <BaseTabs>
        <PhemexOrderbook
          base-tabs-title="Order Book"
          :book="orderbookComputed"
        />
        <PhemexRecentTrades
          base-tabs-title="Recent Trades"
          :trades="tradesComputed"
        />
      </BaseTabs>
    </div>
  </div>
</template>
