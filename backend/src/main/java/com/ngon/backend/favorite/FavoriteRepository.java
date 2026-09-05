package com.ngon.backend.favorite;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteRepository extends JpaRepository<Favorite, Long>{
    List<Favorite> findAllByUserId(Long userId);
    boolean existsByUserIdAndProductId(Long userId, Long productId);
    Optional<Favorite> findByUserIdAndProductId(Long userId, Long productId);
}
