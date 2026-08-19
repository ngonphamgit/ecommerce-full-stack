package com.ngon.backend.order;

import com.ngon.backend.user.User;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order
{
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private LocalDateTime orderTime;
    private BigDecimal total = BigDecimal.ZERO;
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<OrderItem>();

    public void setUser(User user) {this.user = user;}
    public void setOrderTime(LocalDateTime orderTime) {this.orderTime = orderTime;}
    public void setTotal(BigDecimal total) {this.total = total;}
    public void setStatus(OrderStatus status) {this.status = status;}
    public void addOrderItem(OrderItem item)
    {
        this.items.add(item);
        item.setOrder(this);

        BigDecimal subtotal = item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
        total = total.add(subtotal);
    }
    public void removeOrderItem(OrderItem item)
    {
        BigDecimal subtotal = item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
        total = total.subtract(subtotal);

        this.items.remove(item);
        item.setOrder(null);
    }

    public Long getId() {return this.id;}
    public User getUser() {return this.user;}
    public LocalDateTime getOrderTime() {return this.orderTime;}
    public BigDecimal getTotal() {return this.total;}
    public OrderStatus getStatus() {return this.status;}
    public List<OrderItem> getOrderItems() {return this.items;}
}
