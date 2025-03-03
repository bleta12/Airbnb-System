package com.example.Spring.airbnbProperty.repository;
import com.example.Spring.airbnbProperty.models.AirbnbProperty;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface ProductPagingAndSortingRepository extends PagingAndSortingRepository<AirbnbProperty, Long> {

}
