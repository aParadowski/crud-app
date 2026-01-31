export function validateId(inputId: string | string[]) {
  const id = Number(inputId);
  if (Number.isNaN(id)) {
    throw new Error(`Invalid ID found in update, expected a number but received ${id}`);
  }
  return id;
}