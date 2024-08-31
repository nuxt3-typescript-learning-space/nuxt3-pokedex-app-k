<script setup lang="ts">
import PokemonImage from '@/components/layout/PokemonImage.vue';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { usePokemonSpecificDataStore } from '@/store/pokemonSpecificDataStore';

const {
  getHeight: height,
  getWeight: weight,
  getImage: image,
  getPokemonName: name,
  getGenera: genera,
  getFlavorText: flavorText,
  getCries: cries,
} = usePokemonSpecificDataStore();

const handleClickAudioButton = () => {
  const audio = new Audio(cries);
  audio.play();
};
</script>
<template>
  <Card>
    <CardHeader class="flex flex-row justify-center">
      <CardTitle class="text-center text-3xl">{{ name }}</CardTitle>
      <Button :disabled="!cries" class="ml-4 bg-green-400 hover:bg-green-300" @click="handleClickAudioButton">
        <img src="@/assets/image/speaker-icon.svg" alt="鳴き声再生ボタン" />
      </Button>
    </CardHeader>
    <CardContent class="flex items-center justify-center gap-8">
      <div class="flex w-2/5 justify-center">
        <PokemonImage :src="image" :alt="`${name}の画像`" />
      </div>
      <ul class="flex w-2/5 flex-col text-3xl">
        <template v-if="genera">
          <li class="mb-8">{{ genera }}</li>
        </template>
        <li>高さ: {{ height }} m</li>
        <li>重さ: {{ weight }} kg</li>
        <template v-if="flavorText">
          <li class="mt-8">{{ flavorText }}</li>
        </template>
      </ul>
    </CardContent>
  </Card>
</template>
