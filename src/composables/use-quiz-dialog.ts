import { ref, type Ref } from "vue";

interface ReturnValue {
  dialogRef: Ref<{ dialogRef: HTMLDialogElement | null }>;
  open: () => void;
}

export const useQuizDialog = (): ReturnValue => {
  const dialogRef = ref<{ dialogRef: HTMLDialogElement | null }>({
    dialogRef: null,
  });

  const open = () => {
    dialogRef.value.dialogRef?.showModal();
  };

  return {
    dialogRef,
    open,
  };
};
