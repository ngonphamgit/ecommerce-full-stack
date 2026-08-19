package com.ngon.backend.user;

import com.ngon.backend.exception.UserNotFoundException;
import com.ngon.backend.favorite.FavoriteResponse;
import com.ngon.backend.favorite.FavoriteService;
import com.ngon.backend.mapper.ResponseMapper;
import com.ngon.backend.order.OrderResponse;
import com.ngon.backend.order.OrderService;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class UserService
{
    private final UserRepository userRepo;
    private final OrderService orderService;
    private final FavoriteService favoriteService;
    private final ResponseMapper responseMapper;

    public UserService(UserRepository userRepo, 
        OrderService orderService, 
        FavoriteService favoriteService,
        ResponseMapper responseMapper)
    {
        this.userRepo = userRepo;
        this.orderService = orderService;
        this.favoriteService = favoriteService;
        this.responseMapper = responseMapper;
    }

    public UserProfileResponse getMe(Authentication auth)
    {
        User user = userRepo.findByUsername(auth.getName());
        List<OrderResponse> userOrders = (orderService.getUserOrders(user).stream()).map(responseMapper::toOrderResponse).toList();
        List<FavoriteResponse> userFavorites = (favoriteService.getUserFavorites(user).stream()).map(responseMapper::toFavoriteResponse).toList();
    
        return responseMapper.toUserProfileResponse(user, userOrders, userFavorites);
    }

    public void deleteUser(DeleteUserRequest request)
    {
        User user = userRepo.findByUsername(request.username());

        if (user == null)
        {
            throw new UserNotFoundException("User not found");
        }

        userRepo.delete(user);
    }
}
