package com.Server.MediCareServer.service;

import com.Server.MediCareServer.model.MedicineAllocation;
import com.Server.MediCareServer.model.Patient;
import com.Server.MediCareServer.repository.MedicineAllocationRepository;
import com.Server.MediCareServer.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

@Service
public class MedicineAllocationService {

    @Autowired
    MedicineAllocationRepository medicineAllocarionRepository;

    public List<MedicineAllocation> GetMedicineDetails(String id){
        List<MedicineAllocation> medicineAllocationsdetails = medicineAllocarionRepository.getMedicineDetailsByPID(id);

       return medicineAllocationsdetails;
    }

    public int getCountByMID(String id){

        int count = medicineAllocarionRepository.getCountByMID(id);
        return count;
    }


}
