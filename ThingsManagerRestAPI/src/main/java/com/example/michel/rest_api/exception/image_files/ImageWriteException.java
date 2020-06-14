package com.example.michel.rest_api.exception.image_files;

public class ImageWriteException extends Exception {
    public ImageWriteException() {
        super();
    }

    public ImageWriteException(String message) {
        super(message);
    }

    public ImageWriteException(String message, Throwable cause) {
        super(message, cause);
    }

    public ImageWriteException(Throwable cause) {
        super(cause);
    }
}
