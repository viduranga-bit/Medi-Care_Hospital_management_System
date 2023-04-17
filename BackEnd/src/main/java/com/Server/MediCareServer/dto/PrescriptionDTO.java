package com.Server.MediCareServer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class PrescriptionDTO {

    private Long prescriptionId;
    private String Description;
    private Boolean isIssuedMedicine;
    private String medication;
    private String patientName;
    private String doctorName;
    private String  patient_id;


}












