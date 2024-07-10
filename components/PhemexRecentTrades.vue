<script setup>
// TODO: convert to BaseRecentTrades
defineProps({
  trades: {
    type: Array,
    validator: (prop) => {
      if (prop.some((t) => t.length !== 4 || t[2] <= 0 || t[3] <= 0)) {
        return false;
      }

      return true;
    },
  },
});
</script>

<template>
  <div>
    <h2 class="text-sm">Phemex Recent Trades</h2>

    <div class="flex gap-32 text-gray-500 py-2">
      <span class="grow">Price</span>
      <span class="grow">Size</span>
      <span class="pe-6">Time</span>
    </div>

    <div class="font-mono overflow-y-auto h-[32rem]">
      <div v-for="trade in trades" class="flex pe-2">
        <span
          class="grow"
          :class="trade[1] ? 'text-green-500' : 'text-red-500'"
          >{{ trade[2] }}</span
        >
        <span class="grow">{{ trade[3] }}</span>
        <span>{{ trade[0] }}</span>
      </div>
    </div>
  </div>
</template>
