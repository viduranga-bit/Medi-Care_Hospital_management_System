package com.Server.MediCareServer.controller;

import com.Server.MediCareServer.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Server.MediCareServer.repository.MedicineRepository;
import com.Server.MediCareServer.service.MedicineService;
import com.Server.MediCareServer.model.Medicine;

import java.util.*;

@RestController
@RequestMapping("/api/v1/medicine")
public class MedicineController {

    @Autowired
    private MedicineRepository medicineRepository;
    @Autowired 
    MedicineService medicineService;

    @PostMapping
    public Medicine createMedicine(@RequestBody Medicine medicine){
        return medicineRepository.save(medicine);

    }

    @GetMapping
    public List<Medicine> getAllMedicines(){

        return medicineService.findAllOrderByIdDsc();

    }

    @GetMapping(value = "/{mediName}")
    @ResponseBody
    public ResponseEntity<?> getMedicineByName(@PathVariable String mediName){
        Optional<Medicine> medicine  =medicineService.getMedicineByName(mediName);
        if (medicine != null) {
            return new ResponseEntity<>(medicine, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }




}
