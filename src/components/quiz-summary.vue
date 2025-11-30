<script setup lang="ts">
import { computed } from "vue";

import type { QuizReport } from "../types";
import { getFormattedPercentage } from "../utils";

const { quizReport } = defineProps<{ quizReport: QuizReport }>();

const tableData = computed(() =>
  Object.entries(quizReport).map(([category, values]) => ({
    category,
    rows:
      category === "radical"
        ? [{ type: "meaning", ...values.meaning }]
        : [
            { type: "meaning", ...values.meaning },
            { type: "reading", ...values.reading },
          ],
  })),
);
</script>

<template>
  <div class="quiz-summary">
    <table class="table">
      <tbody>
        <template v-for="item in tableData" :key="item.category">
          <tr
            v-for="(row, index) in item.rows"
            :key="row.type"
            class="tr"
            :class="item.category"
          >
            <td
              v-if="index === 0"
              class="td"
              :rowspan="item.category !== 'radical' ? 2 : 1"
            >
              {{ item.category }}
            </td>
            <td class="td">{{ row.type }}</td>
            <td class="td">
              {{ getFormattedPercentage(row.correct, row.total) }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table {
  border-spacing: 0;
}

.td {
  padding: 12px 48px;
  border: 1px solid var(--foreground-color);
  border-spacing: 0;
  font-size: 1.2rem;
  font-weight: bold;
}

.td:first-child {
  text-align: center;
}

.tr:first-of-type .td:first-of-type {
  border-top-left-radius: 16px;
}

.tr:first-of-type .td:last-of-type {
  border-top-right-radius: 16px;
}

.tr:nth-of-type(4n) .td:first-of-type {
  border-bottom-left-radius: 16px;
}

.tr:last-of-type .td:last-of-type {
  border-bottom-right-radius: 16px;
}

.tr.kanji {
  color: var(--kanji-color);
}

.tr.radical {
  color: var(--radical-color);
}

.tr.vocabulary {
  color: var(--vocabulary-color);
}
</style>
