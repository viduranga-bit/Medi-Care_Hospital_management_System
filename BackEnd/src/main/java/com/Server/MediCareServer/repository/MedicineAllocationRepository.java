package com.Server.MediCareServer.repository;

import com.Server.MediCareServer.dto.labReportDto;
import com.Server.MediCareServer.model.Medicine;
import com.Server.MediCareServer.model.MedicineAllocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineAllocationRepository extends JpaRepository<MedicineAllocation,Long> {

    @Query("SELECT m FROM MedicineAllocation m WHERE m.patientId=?1")
    List<MedicineAllocation> getMedicineDetailsByPID(String id);

    @Query("SELECT count(m) FROM MedicineAllocation m WHERE m.pharmacistID=?1")
    int  getCountByMID(String id);



}
