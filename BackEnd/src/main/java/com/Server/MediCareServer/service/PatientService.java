package com.Server.MediCareServer.service;

import java.lang.reflect.Field;
import java.util.Map;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import com.Server.MediCareServer.model.Patient;
import com.Server.MediCareServer.repository.PatientRepository;

@Service
public class PatientService {
    
    @Autowired
	private PatientRepository patientRepository;
	
	 public Optional<Patient> getPatientById(long pid) {
		Optional<Patient> patient = patientRepository.findById(pid);
		return patient;
     }
    
   public Patient updateIsTreatedById(long id,Map<String,Object> fields){
	Optional<Patient> existingPatient = patientRepository.findById(id);
	 if(existingPatient.isPresent()){
	fields.forEach((key,value)->{
	 Field field =  ReflectionUtils.findField(Patient.class, key);
	  field.setAccessible(true);
	  ReflectionUtils.setField(field, existingPatient.get(),value);
	});

	return patientRepository.save(existingPatient.get());
   }
	return null;
}

	public List<Object[]> getPatientCountByRegistrationDate() {
	List<Object[]> patientCountByDate = patientRepository.countPatientsByRegistrationDate();
   patientCountByDate.sort((o1, o2) -> {
    String date1Str = (String) o1[0];
    String date2Str = (String) o2[0];
    if (date1Str == null) {
        return 1; // treat null date as later than any non-null date
    } else if (date2Str == null) {
        return -1; // treat null date as earlier than any non-null date
    } else {
        LocalDate date1 = LocalDate.parse(date1Str);
        LocalDate date2 = LocalDate.parse(date2Str);
        return date1.compareTo(date2);
    }
});
    return patientCountByDate;
}

    public List<Object[]> getPatientsByReceptionist() {
        List<Object[]> patientCountByRec = patientRepository.countPatientsByReceptionist();
        return patientCountByRec;
        }






}