package com.ngon.backend.order;

import java.math.BigDecimal;

public record OrderItemResponse(
        Long id,
        Long productId,
        String name,
        String desc,
        int quantity,
        BigDecimal unitPrice
)
{}
