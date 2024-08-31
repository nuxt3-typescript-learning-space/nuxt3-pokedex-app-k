<script setup lang="ts">
import PokemonImage from '@/components/layout/PokemonImage.vue';
import Spinner from '@/components/layout/Spinner.vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePokemonDataStore } from '@/store/pokemonDataStore';

const pokemonDataStore = usePokemonDataStore();
const { loading: loadingState, getPokemonImageUrls: imageUrls } = storeToRefs(pokemonDataStore);

defineProps<{
  name: string;
  index: number;
  nameId: string;
}>();
</script>
<template>
  <li>
    <NuxtLink :to="`/pokedex/${name}?nameId=${nameId}`">
      <Card class="h-hull">
        <template v-if="loadingState">
          <Spinner class="flex h-[250px] items-center justify-center" />
        </template>
        <template v-else>
          <CardHeader>
            <PokemonImage :src="imageUrls[index]" :alt="`${name}の画像`" />
          </CardHeader>
          <CardContent>
            <CardTitle class="text-center">{{ name }}</CardTitle>
          </CardContent>
        </template>
      </Card>
    </NuxtLink>
  </li>
</template>
