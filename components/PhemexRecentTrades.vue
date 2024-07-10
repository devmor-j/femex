<script setup>
// TODO: convert to BaseRecentTrades
defineProps({
  trades: {
    type: Array,
    validator: (prop) => {
      if (prop.some((t) => t.length !== 4)) {
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

    <div
      class="tracking-wide tabular-nums lining-nums overflow-y-auto h-[32rem]"
    >
      <div
        v-for="(trade, index) in trades"
        class="flex pe-2 items-center cursor-pointer hover:bg-neutral-800"
      >
        <span class="grow" :class="trade[1] ? 'text-buy' : 'text-sell'">
          {{ trade[2] }}

          <i class="not-italic inline-block min-w-[2ch]">{{
            +trade[2] > +trades[index + 1]?.[2]
              ? "&uarr;"
              : +trade[2] < +trades[index + 1]?.[2]
              ? "&darr;"
              : "&nbsp;"
          }}</i>
        </span>
        <span class="grow">{{ trade[3] }}</span>
        <span>{{ trade[0] }}</span>
      </div>
    </div>
  </div>
</template>
