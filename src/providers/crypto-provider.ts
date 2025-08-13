import crypto from "crypto";
import CryptoJS from "crypto-js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const key = process.env.ENCRYPT_CORE_KEY as string;

export class CryptoProvider {
  sha256(payload: string) {
    return crypto.createHash("sha256").update(payload).digest("hex");
  }
  encrypt(value: string) {
    const encrypted = CryptoJS.AES.encrypt(value, key).toString();
    return encrypted; // Return the encrypted data as a string
  }
  decrypt(encryptedData: string) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key); // Decrypt the data
    const originalText = bytes.toString(CryptoJS.enc.Utf8); // Convert bytes to UTF-8 string
    return originalText; // Return the original text
  }
  hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }
  comparePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}

export class JwtProvider {
  generateToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: "1h" });
  }
}
