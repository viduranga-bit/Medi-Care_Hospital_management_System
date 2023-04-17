package com.Server.MediCareServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.Server.MediCareServer.repository.PatientRepository;
import com.Server.MediCareServer.service.PatientService;
import com.Server.MediCareServer.model.Patient;

import java.util.*;

@RestController
@RequestMapping("/api/v1/patients")
public class PatientController {
    @Autowired
    private PatientService patientService;

    @Autowired
    private PatientRepository patientRepository;

    @PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }

   
    @GetMapping(value = "/{pid}") // get patient by patient ID
    public ResponseEntity<?> getPatinetByID(@PathVariable long pid) {
        Optional<Patient> patient = patientService.getPatientById(pid);

        if (patient != null) {
            return new ResponseEntity<>(patient, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping // get deprtment details
    public List<Patient> getAllDepartments() {
        return (List<Patient>) patientRepository.findAll();
    }

     @PatchMapping(value = "/{pid}")
     public Patient patchPatient(@PathVariable long pid,@RequestBody Map<String ,Object> fields){
          return patientService.updateIsTreatedById(pid,fields);
    }

    @PatchMapping(value = "/isSubmit/{pid}")
    public Patient updateIsTreatedById(@PathVariable long pid, @RequestBody Map<String, Object> fields) {
        return patientService.updateIsTreatedById(pid, fields);
    }

    @GetMapping("/count-by-registration-date")
    public List<Object[]> getPatientCountByRegistrationDate() {
        return patientService.getPatientCountByRegistrationDate();
    }

    @GetMapping("/count-by-receptionist")
    public List<Object[]> getPatientsByReceptionist() {
        return patientService.getPatientsByReceptionist();
    }

}