package com.ngon.backend.exception;

public class IllegalOrderRequestException extends RuntimeException {
    public IllegalOrderRequestException(String message)
    {
        super(message);
    }
}
