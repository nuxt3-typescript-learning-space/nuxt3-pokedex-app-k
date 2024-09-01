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
      <CardTitle class="text-center text-3xl" data-testid="card-title">{{ name }}</CardTitle>
      <Button
        :disabled="!cries"
        class="ml-4 bg-green-400 hover:bg-green-300"
        data-testid="audio-button"
        @click="handleClickAudioButton"
      >
        <img src="@/assets/image/speaker-icon.svg" alt="鳴き声再生ボタン" />
      </Button>
    </CardHeader>
    <CardContent class="flex items-center justify-center gap-8">
      <div class="flex w-2/5 justify-center">
        <PokemonImage :src="image" :alt="`${name}の画像`" data-testid="image" />
      </div>
      <ul class="flex w-2/5 flex-col text-3xl">
        <template v-if="genera">
          <li class="mb-8" data-testid="genera">{{ genera }}</li>
        </template>
        <li data-testid="height">高さ: {{ height }} m</li>
        <li data-testid="weight">重さ: {{ weight }} kg</li>
        <template v-if="flavorText">
          <li class="mt-8" data-testid="flavor-text">{{ flavorText }}</li>
        </template>
      </ul>
    </CardContent>
  </Card>
</template>
