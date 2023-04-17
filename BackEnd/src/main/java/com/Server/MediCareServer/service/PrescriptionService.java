package com.Server.MediCareServer.service;

import com.Server.MediCareServer.dto.PrescriptionDTO;
import com.Server.MediCareServer.model.Patient;
import com.Server.MediCareServer.model.Prescription;
import com.Server.MediCareServer.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PrescriptionService {

    @Autowired
    PrescriptionRepository prescriptionRepository;
    public List<PrescriptionDTO> getPrescriptionDetails(){
        List<PrescriptionDTO> prescriptionDTOList = prescriptionRepository.getPrescriptionDetails();
        return prescriptionDTOList;

    }

    public Prescription updateIsIssuedMedicine(long id, Map<String,Object> fields){
        Optional<Prescription> existingPrescription = prescriptionRepository.findById(id);
        if(existingPrescription.isPresent()){
            fields.forEach((key,value)->{
                Field field =  ReflectionUtils.findField(Prescription.class, key);

                    field.setAccessible(true);
                ReflectionUtils.setField(field, existingPrescription.get(),value);
            });

            return prescriptionRepository.save(existingPrescription.get());
        }
        return null;
    }
    
}
