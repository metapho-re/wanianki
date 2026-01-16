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
              {{
                `${row.correct}/${row.total} (${getFormattedPercentage(row.correct, row.total)})`
              }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table {
  overflow: hidden;
  border-radius: var(--radius-md);
  background: var(--background-color-0);
  border-spacing: 0;
  box-shadow: var(--shadow-md);
}

.td {
  padding: 14px 40px;
  border: 1px solid var(--background-color-3);
  border-spacing: 0;
  font-size: 1rem;
  font-weight: 400;
}

.tr:first-of-type .td:first-of-type {
  border-top-left-radius: var(--radius-md);
}

.tr:first-of-type .td:last-of-type {
  border-top-right-radius: var(--radius-md);
}

.tr:nth-of-type(4n) .td:first-of-type {
  border-bottom-left-radius: var(--radius-md);
}

.tr:last-of-type .td:last-of-type {
  border-bottom-right-radius: var(--radius-md);
}

.tr.radical .td:first-child {
  background: linear-gradient(
    90deg,
    var(--radical-color-transparent) 0%,
    transparent 100%
  );
  color: var(--radical-color);
  font-weight: 700;
  text-align: center;
  text-transform: capitalize;
}

.tr.kanji:nth-child(2n) .td:first-child {
  background: linear-gradient(
    90deg,
    var(--kanji-color-transparent) 0%,
    transparent 100%
  );
  color: var(--kanji-color);
  font-weight: 700;
  text-align: center;
  text-transform: capitalize;
}

.tr.vocabulary:nth-child(2n) .td:first-child {
  background: linear-gradient(
    90deg,
    var(--vocabulary-color-transparent) 0%,
    transparent 100%
  );
  color: var(--vocabulary-color);
  font-weight: 700;
  text-align: center;
  text-transform: capitalize;
}
</style>
