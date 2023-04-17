package com.Server.MediCareServer.controller;

import com.Server.MediCareServer.exception.ResourseNotFoundException;
import com.Server.MediCareServer.model.Department;
import com.Server.MediCareServer.model.Medicine;
import com.Server.MediCareServer.model.MedicineAllocation;
import com.Server.MediCareServer.model.Patient;
import com.Server.MediCareServer.repository.MedicineAllocationRepository;
import com.Server.MediCareServer.repository.MedicineRepository;
import com.Server.MediCareServer.service.MedicineAllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/medicineAllocation")
public class MedicineAllocationController {

    @Autowired
    private MedicineAllocationRepository medicineallocationRepository;
   @Autowired
   private  MedicineRepository medicineRepository;
    @Autowired
    private MedicineAllocationService medicineAllocationService;
    @PostMapping
    public MedicineAllocation createMedicineRecord(@RequestBody MedicineAllocation medicineAllocation) {
        return medicineallocationRepository.save(medicineAllocation);
    }


    @GetMapping // get deprtment details
    public List<MedicineAllocation> getAllMedicineAllocations() {
        return (List<MedicineAllocation>) medicineallocationRepository.findAll();
    }

    @GetMapping("/get-details-by-pid/{pid}")
    public List<MedicineAllocation> getAllMedicinesbyPID(@PathVariable("pid") String pid){

        return medicineAllocationService.GetMedicineDetails(pid);

    }

    @DeleteMapping("/delete-med-from-allocation/{issue_id}")
    public ResponseEntity<HttpStatus> deleteMedicine(@PathVariable(value = "issue_id") long issue_id){
 MedicineAllocation medicineAllocation = medicineallocationRepository.findById(issue_id)
         .orElseThrow(() ->new ResourseNotFoundException("Medicine not exist with id :"+issue_id));

        medicineallocationRepository.deleteById(issue_id);

        int allocatedQty = Integer.parseInt(medicineAllocation.getQunataty());

        long AllocatedmedId = Long.parseLong(medicineAllocation.getMedicineID());
        Medicine medicine = medicineRepository.findById(AllocatedmedId)
                .orElseThrow(() -> new EntityNotFoundException("Medicine with ID " + AllocatedmedId + " not found"));

        int currentQuantity = Integer.parseInt(medicine.getCurrentQuantity());

        int ReturnedQty = currentQuantity + allocatedQty;
        medicine.setCurrentQuantity(Integer.toString(ReturnedQty));
        medicineRepository.save(medicine);
        return new ResponseEntity<>(HttpStatus.OK);
    }



    @PostMapping("/allocate-medicine/{mid}/{qty}")
    public ResponseEntity<?> allocateMedicine(@PathVariable("mid") long medicineId,
                                                               @PathVariable("qty") int allocatedQuantity) {

        // update the current quantity of the medicine
        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new EntityNotFoundException("Medicine with ID " + medicineId + " not found"));

        int currentQuantity = Integer.parseInt(medicine.getCurrentQuantity());
        if (allocatedQuantity > currentQuantity) {
            throw new IllegalArgumentException("Cannot allocate more than current quantity");
        }

        int newQuantity = currentQuantity - allocatedQuantity;
        medicine.setCurrentQuantity(Integer.toString(newQuantity));
        medicineRepository.save(medicine);

       return ResponseEntity.ok(HttpStatus.OK);

    }

    @GetMapping("get-count-by-id/{mid}")
    public int getCountByMID(@PathVariable("mid") String pharmacistID){

           return medicineallocationRepository.getCountByMID(pharmacistID);
    }

}