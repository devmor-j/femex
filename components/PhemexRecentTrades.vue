<script setup>
// TODO: convert to BaseRecentTrades
const props = defineProps({
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

const isLoading = ref(true);

const unwatchLoading = watch(
  () => props.trades[0]?.[2],
  (lastTradedPrice) => {
    if (lastTradedPrice > 0) {
      isLoading.value = false;
      unwatchLoading();
    }
  }
);

onMounted(() => {
  if (props.trades.length > 0) {
    isLoading.value = false;
    unwatchLoading();
  }
});
</script>

<template>
  <div>
    <div class="flex gap-32 text-gray-500 py-2 text-sm">
      <span class="grow">Price</span>
      <span class="grow">Size</span>
      <span class="pe-5">Time</span>
    </div>

    <div v-if="isLoading" class="w-8 h-8 block mx-auto">
      <SvgSpinner class="stroke-gray-300" />
    </div>
    <div v-else class="tabular-nums lining-nums overflow-y-auto h-[32rem]">
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
