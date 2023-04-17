
package com.Server.MediCareServer.repository;

import java.util.List;

import com.Server.MediCareServer.dto.PrescriptionDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.Server.MediCareServer.model.Patient;
import com.Server.MediCareServer.model.Prescription;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription,Long> {



   @Query("SELECT new com.Server.MediCareServer.dto.PrescriptionDTO(l.prescription_Id,l.Description,l.isIssuedMedicine,l.medication,p.patientName,u.username,CAST(l.patient_id as string)) FROM Prescription l INNER JOIN Patient p ON l.patient_id = p.patientId INNER JOIN userdetail u ON l.doc_id = u.id")
   List<PrescriptionDTO>getPrescriptionDetails();
         
   

}