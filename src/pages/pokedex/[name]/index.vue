<script setup lang="ts">
import DetailPage from '@/features/pokedex/name/components/DetailPage.vue';

const route = useRoute();
const { name } = route.params;

useHead({
  title: `ポケモン図鑑 : ${name}`,
});
</script>
<template>
  <DetailPage />
</template>
