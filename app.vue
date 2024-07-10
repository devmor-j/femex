<script setup>
const { orderbookComputed, tradesComputed, connect } =
  usePhemexContractWebSocket();

onMounted(() => {
  connect();
});
</script>

<template>
  <div class="m-8">
    <PhemexOrderbook :book="orderbookComputed" />
  </div>
</template>
