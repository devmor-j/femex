<script setup>
const { orderbookRef, tradeRef, connect } = usePhemexContractWebSocket();

onMounted(() => {
  connect();
});
</script>

<template>
  <div>
    <h1>Hello Femex</h1>
  </div>
</template>
