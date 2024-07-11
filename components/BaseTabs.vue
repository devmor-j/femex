<script setup>
const TITLE_PROP = "base-tabs-title";

const slots = useSlots();

const tabTitles = computed(() =>
  slots.default().map((s) => s.props?.[TITLE_PROP])
);

const activeTab = computed(() =>
  slots.default().find((s) => s.props?.[TITLE_PROP] === activeTabTitle.value)
);

const activeTabTitle = ref(tabTitles.value.find((t) => t));

const activateTab = (tabTitle) => {
  activeTabTitle.value = tabTitle;
};
</script>

<template>
  <div>
    <div class="flex gap-4 w-fit space-x-2">
      <span
        v-for="tabTitle in tabTitles"
        :key="tabTitle"
        class="p-1 cursor-pointer text-gray-400 select-none"
        :class="{ 'border-b-2 text-white': activeTabTitle === tabTitle }"
        @click="activateTab(tabTitle)"
      >
        {{ tabTitle }}
      </span>
    </div>

    <KeepAlive>
      <component :is="activeTab" />
    </KeepAlive>
  </div>
</template>
