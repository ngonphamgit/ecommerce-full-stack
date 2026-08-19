package com.ngon.backend.order;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long>
{
    List<Order> findAllByUserId(Long userId);
    Optional<Order> findById(Long id);
    Optional<Order> findByUserIdAndStatus(Long userId, OrderStatus status);
}
