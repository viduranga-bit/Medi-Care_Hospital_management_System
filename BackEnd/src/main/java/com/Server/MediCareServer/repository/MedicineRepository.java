package com.Server.MediCareServer.repository;

import java.util.List;
import com.Server.MediCareServer.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Sort;


@Repository
public interface MedicineRepository extends JpaRepository<Medicine,Long> {


   @Query("FROM Medicine")
    List<Medicine> findAllOrderByNameDsc(Sort sort);

    Medicine findByMedicineName(String name);

}
