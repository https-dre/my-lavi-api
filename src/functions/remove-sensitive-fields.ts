/**
 * Remove campos com 'hash' no nome
 */
export type RemoveHashFields<T> = {
  [K in keyof T as K extends `${string}hash${string}` ? never : K]: T[K];
};

/**
 * Remove todos os campos com "hash" no nome da chave.
 *
 * @param model - Objeto original contendo diversos campos
 * @returns Um novo objeto sem os campos que contêm "hash"
 */
export const remove_hash_fields = <T extends Record<string, any>>(model: T): 
  RemoveHashFields<T> => {
  const result = {} as RemoveHashFields<T>;

  for(const key in model) {
    if(!key.toLowerCase().includes("sha256")) {
      result[key] = model[key];
    }
  }

  return result;
}