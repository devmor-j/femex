<script setup>
// TODO: convert to BaseOrderbook
defineProps({
  book: {
    type: { asks: [], bids: [] },
    validator: (prop) => {
      if (
        prop.asks.some((a) => a.length !== 2) ||
        prop.bids.some((b) => b.length !== 2)
      ) {
        return false;
      }

      return true;
    },
  },
});
</script>

<template>
  <div>
    <h2 class="text-sm">Phemex Orderbook</h2>

    <div class="flex gap-32 text-gray-500 py-2">
      <span class="grow">Price</span>
      <span>Size</span>
    </div>

    <div class="font-mono">
      <div v-for="ask in book.asks" class="flex">
        <span class="grow text-red-500">{{ ask[0] }}</span>
        <span>{{ ask[1] }}</span>
      </div>
    </div>

    <!-- TODO: add last trade price -->
    <hr class="my-4" />

    <div class="font-mono">
      <div v-for="bid in book.bids" class="flex">
        <span class="grow text-green-500">{{ bid[0] }}</span>
        <span>{{ bid[1] }}</span>
      </div>
    </div>
  </div>
</template>