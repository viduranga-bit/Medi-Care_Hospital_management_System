package com.Server.MediCareServer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Server.MediCareServer.model.Medicine;
import com.Server.MediCareServer.repository.MedicineRepository;

import lombok.var;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort;

@Service
public class MedicineService {

    @Autowired
	private MedicineRepository medicineRepository;
	

     
    public List<Medicine> findAllOrderByIdDsc() {

        Sort sort = Sort.by(Sort.Direction.DESC,"medicineId");
        return medicineRepository.findAllOrderByNameDsc(sort);
    }

    public Optional<Medicine> getMedicineByName(String name){
        Optional<Medicine> medicine = Optional.ofNullable(medicineRepository.findByMedicineName(name));
        return  medicine;
    }

   
    
}
