<script setup>
// TODO: convert to BaseOrderbook
const props = defineProps({
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
  lastTrade: {
    type: { price: Number, isBuy: Boolean },
    default: {},
  },
});

const asksComputed = computed(() =>
  props.book.asks.slice(bookViewSetting.value === "sell" ? -20 : -10)
);

const bidsComputed = computed(() =>
  props.book.bids.slice(0, bookViewSetting.value === "buy" ? 20 : 10)
);

const bookViewSetting = ref("default");

const updateBookView = (view) => {
  if (view !== bookViewSetting.value) {
    bookViewSetting.value = view;
  }
};
</script>

<template>
  <div class="relative">
    <div class="flex gap-x-1 items-center my-3 w-fit">
      <img
        @click="updateBookView('default')"
        src="/assets/images/default.png"
        alt="orderbook default view"
        class="max-w-4 cursor-pointer"
      />
      <img
        @click="updateBookView('sell')"
        src="/assets/images/sell.png"
        alt="orderbook sell view"
        class="max-w-4 cursor-pointer"
      />
      <img
        @click="updateBookView('buy')"
        src="/assets/images/buy.png"
        alt="orderbook buy view"
        class="max-w-4 cursor-pointer"
      />
    </div>

    <div class="flex gap-32 text-gray-500 my-2 text-sm">
      <span class="grow">Price</span>
      <span>Size</span>
    </div>

    <TransitionGroup
      move-class="transition-opacity transition-transform"
      enter-active-class="transition-opacity transition-transform"
      leave-active-class="transition-opacity transition-transform absolute"
      enter-from-class="opacity-0 transform"
      leave-to-class="opacity-0 transform"
    >
      <div
        v-if="bookViewSetting !== 'buy'"
        class="tabular-nums lining-nums"
        key="phemex-orderbook-buys"
      >
        <div
          v-for="ask in asksComputed"
          class="flex cursor-pointer hover:bg-neutral-800"
        >
          <span class="grow text-sell">{{ ask[0] }}</span>
          <span>{{ ask[1] }}</span>
        </div>
      </div>

      <div class="py-2" key="phemex-orderbook-last-price">
        <span
          class="font-black text-2xl min-h-8 flex items-center gap-x-1 cursor-pointer"
          :class="lastTrade.isBuy ? 'text-buy' : 'text-sell'"
        >
          {{ lastTrade.price }}
          <i class="text-base" v-if="typeof lastTrade.isBuy === 'boolean'">{{
            lastTrade.isBuy ? "&#9650;" : "&#9660;"
          }}</i>
        </span>
      </div>

      <div
        v-if="bookViewSetting !== 'sell'"
        class="tabular-nums lining-nums"
        key="phemex-orderbook-sells"
      >
        <div
          v-for="bid in bidsComputed"
          class="flex cursor-pointer hover:bg-neutral-800"
        >
          <span class="grow text-buy">{{ bid[0] }}</span>
          <span>{{ bid[1] }}</span>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
