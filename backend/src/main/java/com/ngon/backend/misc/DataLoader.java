package com.ngon.backend.misc;

import com.ngon.backend.exception.ProductNotFoundException;
import com.ngon.backend.exception.UserNotFoundException;
import com.ngon.backend.order.Order;
import com.ngon.backend.order.OrderItem;
import com.ngon.backend.order.OrderItemRepository;
import com.ngon.backend.order.OrderRepository;
import com.ngon.backend.order.OrderStatus;
import com.ngon.backend.product.Product;
import com.ngon.backend.product.ProductType;
import com.ngon.backend.user.Role;
import com.ngon.backend.user.User;
import com.ngon.backend.product.ProductRepository;
import com.ngon.backend.user.UserRepository;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class DataLoader implements CommandLineRunner
{
    private final UserRepository userRepo;
    private final ProductRepository productRepo;
    private final OrderRepository orderRepo;
    private final OrderItemRepository orderItemRepo;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UserRepository userRepo, 
        ProductRepository productRepo, 
        OrderRepository orderRepo,
        OrderItemRepository orderItemRepo, 
        PasswordEncoder passwordEncoder)
    {
        this.userRepo = userRepo;
        this.productRepo = productRepo;
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args)
    {
        Faker faker = new Faker();

        if (userRepo.count() <= 1)
        {
            for (int i = 0; i < 50; i++)
            {
                User user = new User();
                user.setUsername("user" + i);
                user.setEmail(user.getUsername() + "@gmail.com");
                user.setPassword(passwordEncoder.encode("password" + i));
                user.setRole(Role.ROLE_USER);

                userRepo.save(user);
            }
        }

        if (productRepo.count() <= 0)
        {
            for (int i = 0; i < 1000; i++)
            {
                Product product = new Product();
                product.setName(faker.commerce().productName());
                product.setQuantity(ThreadLocalRandom.current().nextInt(100) + 1);
                product.setPrice(BigDecimal.valueOf(ThreadLocalRandom.current().nextInt(100, 100000), 2));
                product.setCategory("category" + ThreadLocalRandom.current().nextInt(1, 8));
                product.setDescription(faker.lorem().sentence());
                product.setProductType(ProductType.NORMAL);

                productRepo.save(product);
            }
        }

        /*
        List<User> users = userRepo.findAll();
        List<Product> products = productRepo.findAll();
        for (int i = 0; i < 200; i++)
        {
            Order order = new Order();
            User randomUser = users.get(ThreadLocalRandom.current().nextInt(users.size()));

            order.setUser(randomUser);
            order.setOrderTime(LocalDateTime.now().minusDays(ThreadLocalRandom.current().nextLong(0, 180)));
            order.setStatus(OrderStatus.PLACED);
            
            BigDecimal total = BigDecimal.ZERO;
            for (int j = 0; j < ThreadLocalRandom.current().nextInt(3, 7); j++)
            {
                OrderItem orderItem = new OrderItem();
                Product randomProduct = products.get(ThreadLocalRandom.current().nextInt(products.size()));

                orderItem.setOrder(order);
                orderItem.setProduct(randomProduct);
                orderItem.setQuantity(ThreadLocalRandom.current().nextInt(1, 10));
                orderItem.setUnitPrice(randomProduct.getPrice());

                total = total.add(randomProduct.getPrice().multiply(BigDecimal.valueOf(orderItem.getQuantity())));

                order.addOrderItem(orderItem);
            }

            orderRepo.save(order);
        }
        */
    }
}
