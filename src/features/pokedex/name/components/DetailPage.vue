<script setup lang="ts">
import DetailCard from './DetailCard.vue';

const pokemonSpecificDataStore = usePokemonSpecificDataStore();
const { updateSpecificPokemonData } = pokemonSpecificDataStore;

const route = useRoute();
const router = useRouter();

const nameId = route.query.nameId as string;

const handleClickBackButton = () => {
  router.back();
};

await updateSpecificPokemonData(nameId);
</script>
<template>
  <DetailCard />
  <div class="flex justify-center">
    <Button class="mt-4 bg-green-400 font-bold hover:bg-green-300" @click="handleClickBackButton">もどる</Button>
  </div>
</template>
