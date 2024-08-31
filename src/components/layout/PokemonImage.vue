<script setup lang="ts">
type Props = {
  src?: string;
  alt?: string;
};

defineProps<Props>();
</script>
<template>
  <template v-if="src">
    <img :src="src" :alt="alt" />
  </template>
  <template v-else>
    <img src="@/assets/image/no-image.png" alt="画像なし" />
  </template>
</template>
