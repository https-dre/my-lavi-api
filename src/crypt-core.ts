import CryptoJS from "crypto-js";
import crypto from "crypto";

const key = process.env.ENCRYPT_CORE_KEY as string;

export function encrypt(plaintext: string): string {
  const encrypted = CryptoJS.AES.encrypt(plaintext, key).toString();
  return encrypted; // Return the encrypted data as a string
}

export function decrypt(encryptedData: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key); // Decrypt the data
  const originalText = bytes.toString(CryptoJS.enc.Utf8); // Convert bytes to UTF-8 string
  return originalText; // Return the original text
}

export function sha256(payload: string): string {
  return crypto.createHash("sha256").update(payload).digest("hex");
}
