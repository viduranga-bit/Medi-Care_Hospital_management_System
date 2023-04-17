package com.Server.MediCareServer.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.Server.MediCareServer.model.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient,Long> {

   Optional<Patient> findById(long pid);

   @Query("SELECT p.admitdate, COUNT(p) FROM Patient p GROUP BY p.admitdate")
   List<Object[]> countPatientsByRegistrationDate();

   @Query("SELECT p.res_id, COUNT(p) FROM Patient p GROUP BY p.res_id")
   List<Object[]> countPatientsByReceptionist();
         
   

}