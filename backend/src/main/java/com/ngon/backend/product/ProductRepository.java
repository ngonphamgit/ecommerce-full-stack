package com.ngon.backend.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long>
{
    Page<Product> findAllByCategory(String category, Pageable pageable);
    Page<Product> findAllByProductType(ProductType productType, Pageable pageable);

    @Query(value =
            "SELECT * " +
            "FROM products " +
            "WHERE to_tsvector('english', name) @@ plainto_tsquery('english', :query) " +
            "ORDER BY ts_rank(to_tsvector('english', name), plainto_tsquery('english', :query)) DESC",
            countQuery =
            "SELECT count(*) " +
            "FROM products " +
            "WHERE to_tsvector('english', name) @@ plainto_tsquery('english', :query)",
            nativeQuery = true
    )
    Page<Product> searchByName(@Param("query") String name, Pageable page);
}
