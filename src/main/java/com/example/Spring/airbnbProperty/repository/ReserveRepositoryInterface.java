package com.example.Spring.airbnbProperty.repository;

import com.example.Spring.airbnbProperty.models.Reservation;
import com.example.Spring.airbnbProperty.models.dtos.ReservationDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReserveRepositoryInterface  extends CrudRepository<Reservation,Integer> {



    @Query("SELECT new com.example.Spring.airbnbProperty.models.dtos.ReservationDTO(r.cmimi, r.startDate, r.endDate, r.totalGuests, r.kids, r.adults) " +
            "FROM Reservation r WHERE r.user.id = :userId")
    List<ReservationDTO> findReservationsByUserId(@Param("userId") Long userId);



}
