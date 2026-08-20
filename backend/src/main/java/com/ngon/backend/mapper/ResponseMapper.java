package com.ngon.backend.mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.ngon.backend.favorite.Favorite;
import com.ngon.backend.favorite.FavoriteResponse;
import com.ngon.backend.order.CheckoutResponse;
import com.ngon.backend.order.Order;
import com.ngon.backend.order.OrderItem;
import com.ngon.backend.order.OrderItemResponse;
import com.ngon.backend.order.OrderResponse;
import com.ngon.backend.product.Product;
import com.ngon.backend.product.ProductResponse;
import com.ngon.backend.user.User;
import com.ngon.backend.user.UserProfileResponse;
import com.ngon.backend.user.UserResponse;

@Component
public class ResponseMapper {
    public UserResponse toUserResponse(User user)
    {
        return new UserResponse(
            user.getUsername(),
            user.getEmail()
        );
    }

    public UserProfileResponse toUserProfileResponse(User user, List<OrderResponse> userOrders, List<FavoriteResponse> userFavorites)
    {
        return new UserProfileResponse(
            toUserResponse(user),
            userOrders,
            userFavorites
        );
    }

    public ProductResponse toProductResponse(Product product)
    {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getQuantity(),
                product.getPrice(),
                product.getCategory(),
                product.getDescription(),
                product.getProductType().toString()
        );
    }

    public OrderResponse toOrderResponse(Order order)
    {
        List<OrderItemResponse> orderItemResponses = new ArrayList<>();
        for (OrderItem orderItem : order.getOrderItems())
        {
            orderItemResponses.add(toOrderItemResponse(orderItem));
        }
        return new OrderResponse(order.getId(), order.getStatus(), order.getOrderTime(), order.getTotal(), orderItemResponses);
    }

    public OrderItemResponse toOrderItemResponse(OrderItem orderItem)
    {
        return new OrderItemResponse(
            orderItem.getId(),
            orderItem.getProduct().getId(),
            orderItem.getProduct().getName(),
            orderItem.getProduct().getDescription(),
            orderItem.getQuantity(),
            orderItem.getUnitPrice()
        );
    }

    public CheckoutResponse toCheckoutResponse(Order order)
    {
        List<OrderItemResponse> orderItemResponses = new ArrayList<>();
        for (OrderItem orderItem : order.getOrderItems())
        {
            orderItemResponses.add(toOrderItemResponse(orderItem));
        }
        return new CheckoutResponse(
                order.getId(),
                order.getTotal(),
                LocalDateTime.now(),
                orderItemResponses
        );
    }

    public FavoriteResponse toFavoriteResponse(Favorite favorite)
    {
        return new FavoriteResponse(
            favorite.getId(),
            toProductResponse(favorite.getProduct())
        );
    }
}
