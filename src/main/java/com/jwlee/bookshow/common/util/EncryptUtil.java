package com.jwlee.bookshow.common.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

public class EncryptUtil {

    /**
     * random 8byte salt generator
     * @return
     */
    public static String generateSalt() {
        Random random = new Random();
        byte[] salt = new byte[8];
        random.nextBytes(salt);

        StringBuffer sb = new StringBuffer();
        for(int i = 0; i < salt.length; i++) {
            sb.append(String.format("%02x", salt[i]));
        }
        return sb.toString();
    }

    /**
     * SHA-256, salt 암호화
     * @param text
     * @param salt
     * @return
     */
    public static String encryptSHA256(String text, byte[] salt) {
        try {
            byte[] textBytes = text.getBytes();
            byte[] bytes = new byte[textBytes.length + salt.length];
            System.arraycopy(textBytes, 0, bytes, 0, textBytes.length);
            System.arraycopy(salt, 0, bytes, textBytes.length, salt.length);

            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(bytes);
            byte[] byteData = md.digest();

            StringBuffer sb = new StringBuffer();
            for(int i = 0; i < byteData.length; i++) {
                sb.append(Integer.toString((byteData[i] & 0xFF) + 256, 16).substring(1));
            }
            return sb.toString();
        } catch(NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }

}
