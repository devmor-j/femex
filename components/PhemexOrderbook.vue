<script setup>
// TODO: convert to BaseOrderbook
defineProps({
  book: {
    type: { asks: [], bids: [] },
    validator: (prop) => {
      if (
        prop.asks.some((a) => a.length !== 2 || (a[0] <= 0 && a[1] < 0)) ||
        prop.bids.some((b) => b.length !== 2 || (b[0] <= 0 && b[1] < 0))
      ) {
        return false;
      }

      return true;
    },
  },
});
</script>

<template>
  <div class="w-fit mx-auto">
    <div class="text-red-500">
      <div v-for="ask in book.asks" class="flex gap-4 justify-center">
        <span class="min-w-[6ch]">{{ ask[0] }}</span>
        <span>|</span>
        <span class="min-w-[6ch]">{{ ask[1] }}</span>
      </div>
    </div>

    <hr class="my-2" />

    <div class="text-green-500">
      <div v-for="bid in book.bids" class="flex gap-4 justify-center">
        <span class="min-w-[6ch]">{{ bid[0] }}</span>
        <span>|</span>
        <span class="min-w-[6ch]">{{ bid[1] }}</span>
      </div>
    </div>
  </div>
</template>
