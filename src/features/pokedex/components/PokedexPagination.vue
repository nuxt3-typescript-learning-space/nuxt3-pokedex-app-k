<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination';
import { ITEMS_PER_PAGE } from '@/constants/pokedex';

type PokedexPaginationProps = {
  totalCount: number;
  currentPage: number;
};

const props = defineProps<PokedexPaginationProps>();
const { totalCount, currentPage } = toRefs(props);

const totalPages = computed(() => Math.ceil(totalCount.value / ITEMS_PER_PAGE));
const isNextButtonDisabled = computed(() => totalPages.value === currentPage.value);
const isPreviousButtonDisabled = computed(() => currentPage.value === 1);

const createPageUrl = (page: number) => `/pokedex?page=${page}`;

const getPagesToShow = (currentPage: number, totalPages: number) => {
  const pages: (number | string)[] = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push('ellipsis-start');
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push('ellipsis-end');
    }
    pages.push(totalPages);
  }

  return pages;
};

const pagesToShow = computed(() => getPagesToShow(currentPage.value, totalPages.value));

const handlePageClick = (page: number) => {
  if (page !== currentPage.value) {
    navigateTo(createPageUrl(page));
  }
};
</script>

<template>
  <Pagination :total="totalPages" :sibling-count="1" show-edges :default-page="currentPage">
    <PaginationList class="flex items-center gap-1 pt-4">
      <PaginationFirst :disabled="isPreviousButtonDisabled" @click="handlePageClick(1)" />
      <PaginationPrev :disabled="isPreviousButtonDisabled" @click="handlePageClick(currentPage - 1)" />

      <template v-for="(pageItem, index) in pagesToShow" :key="index">
        <template v-if="typeof pageItem === 'number'">
          <PaginationListItem :value="pageItem" as-child>
            <Button
              class="h-10 w-10 p-0"
              :class="{ 'bg-green-400 hover:bg-green-300': pageItem === currentPage }"
              :variant="pageItem === currentPage ? 'default' : 'outline'"
              @click="handlePageClick(pageItem)"
            >
              {{ pageItem }}
            </Button>
          </PaginationListItem>
        </template>
        <template v-else>
          <PaginationEllipsis />
        </template>
      </template>

      <PaginationNext :disabled="isNextButtonDisabled" @click="handlePageClick(currentPage + 1)" />
      <PaginationLast :disabled="isNextButtonDisabled" @click="handlePageClick(totalPages)" />
    </PaginationList>
  </Pagination>
</template>
