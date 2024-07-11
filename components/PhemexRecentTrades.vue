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
    <div class="flex gap-32 text-gray-500 py-2 text-sm">
      <span class="grow">Price</span>
      <span class="grow">Size</span>
      <span class="pe-5">Time</span>
    </div>

    <div class="tabular-nums lining-nums overflow-y-auto h-[32rem]">
      <div
        v-for="(trade, index) in trades"
        :key="index"
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
