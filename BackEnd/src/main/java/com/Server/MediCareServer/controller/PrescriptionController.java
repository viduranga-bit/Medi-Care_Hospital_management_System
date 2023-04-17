package com.Server.MediCareServer.controller;
import com.Server.MediCareServer.dto.PrescriptionDTO;
import com.Server.MediCareServer.model.Medicine;
import com.Server.MediCareServer.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.Server.MediCareServer.repository.PrescriptionRepository;
import com.Server.MediCareServer.model.Prescription;
import java.util.*;

@RestController
@RequestMapping("/api/v1/prescription")
public class PrescriptionController {

    @Autowired
    private PrescriptionRepository prescriptionRepository;
    @Autowired
    private PrescriptionService prescriptionService;
    @PostMapping
    public Prescription createPrescription(@RequestBody Prescription prescription) {
        return prescriptionRepository.save(prescription);
    }
    @GetMapping("/get-prescription-details")
    public List<PrescriptionDTO> getlabDetails() {
        return prescriptionService.getPrescriptionDetails();
    }

    @PatchMapping(value = "/{pid}")
    public Prescription patchMedicineIssue(@PathVariable long pid, @RequestBody Map<String ,Object> fields){
        return prescriptionService.updateIsIssuedMedicine(pid,fields);
    }
}
