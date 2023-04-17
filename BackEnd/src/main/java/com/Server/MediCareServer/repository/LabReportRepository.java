package com.Server.MediCareServer.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.Server.MediCareServer.model.LabReport;
import com.Server.MediCareServer.model.Patient;
import com.Server.MediCareServer.dto.labReportDto;

@Repository
public interface LabReportRepository extends JpaRepository<LabReport,Long>{
    
  @Query("SELECT p.patientName FROM Patient p INNER JOIN LabReport l ON p.patientId=l.patient_id WHERE l.labReport_Id IN :rId ")
  String getPatientNameFromId(Long rId);


  @Query("SELECT new com.Server.MediCareServer.dto.labReportDto(l.labReport_Id,l.laboratarist_id,l.doc_id,l.reportName,p.patientName,u.username,CAST(l.submitTime as string),CAST(p.patientId as string)) FROM LabReport l INNER JOIN Patient p ON l.patient_id = p.patientId INNER JOIN userdetail u ON l.doc_id = u.id")
  List<labReportDto> getLabreportDetails();

}
  