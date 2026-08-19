package com.ngon.backend.order;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("orders")
public class OrderController
{
    private final OrderService orderService;

    public OrderController(OrderService orderService)
    {
        this.orderService = orderService;
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/cart")
    public OrderResponse getCurrentOrder(Authentication auth)
    {
        return orderService.getCurrentOrder(auth);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/order")
    public OrderResponse getOrderById(Authentication auth, @RequestParam Long id)
    {
        return orderService.getOrderByOrderId(auth, id);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping("/addItem")
    public OrderResponse addItemToCart(@RequestBody AddOrderItemRequest request, Authentication auth)
    {
        return orderService.addItemToCart(request, auth);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping("/removeItem")
    public OrderResponse removeItemFromCart(@RequestBody RemoveOrderItemRequest request, Authentication auth)
    {
        return orderService.removeItemFromCart(request, auth);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping("/updateItem")
    public OrderResponse updateItemInCart(@RequestBody UpdateOrderItemRequest request, Authentication auth)
    {
        return orderService.updateItemInCart(request, auth);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping("/checkout")
    public CheckoutResponse checkout(Authentication auth)
    {
        return orderService.checkout(auth);
    }
}
