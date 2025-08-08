/**
 * Remove campos com 'sha256' no nome
 */
export type RemoveSha256Fields<T> = {
  [K in keyof T as K extends `${string}sha256${string}` ? never : K]: T[K];
};

/**
 * Remove todos os campos com "sha256" no nome da chave.
 *
 * @param model - Objeto original contendo diversos campos
 * @returns Um novo objeto sem os campos que contêm "sha256"
 */
export const remove_sha256_fields = <T extends Record<string, any>>(model: T): 
  RemoveSha256Fields<T> => {
  const result = {} as RemoveSha256Fields<T>;

  for(const key in model) {
    if(!key.toLowerCase().includes("sha256")) {
      result[key] = model[key];
    }
  }

  return result;
}