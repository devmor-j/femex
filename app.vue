<script setup>
const { orderbookComputed, tradesComputed, connect } =
  usePhemexContractWebSocket();

onMounted(() => {
  connect();
});
</script>

<template>
  <div class="m-8">
    <div class="w-fit mx-auto">
      <div class="text-red-500">
        <div
          v-for="ask in orderbookComputed.asks.slice(20)"
          class="flex gap-4 justify-center"
        >
          <span class="min-w-[6ch]">{{ ask[0] }}</span>
          <span>|</span>
          <span class="min-w-[6ch]">{{ ask[1] }}</span>
        </div>
      </div>

      <hr class="my-2" />

      <div class="text-green-500">
        <div
          v-for="bid in orderbookComputed.bids.slice(0, 10)"
          class="flex gap-4 justify-center"
        >
          <span class="min-w-[6ch]">{{ bid[0] }}</span>
          <span>|</span>
          <span class="min-w-[6ch]">{{ bid[1] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
