package com.ngon.backend.favorite;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/favorites")
public class FavoriteController {
    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService)
    {
        this.favoriteService = favoriteService;
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping("/add")
    public List<FavoriteResponse> addFavorite(@RequestParam Long productId, Authentication auth)
    {
        return favoriteService.addFavorite(productId, auth);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping("/remove")
    public List<FavoriteResponse> removeFavorite(@RequestParam Long productId, Authentication auth)
    {
        return favoriteService.removeFavorite(productId, auth);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/check")
    public boolean favoriteExistsByProductId(@RequestParam Long productId, Authentication auth)
    {
        return favoriteService.favoriteExistsByProductId(productId, auth);
    }
}
