package com.example.michel.rest_api.exception.image_files;

public class ImageReadException extends Exception {
    public ImageReadException() {
        super();
    }

    public ImageReadException(String message) {
        super(message);
    }

    public ImageReadException(String message, Throwable cause) {
        super(message, cause);
    }

    public ImageReadException(Throwable cause) {
        super(cause);
    }
}
