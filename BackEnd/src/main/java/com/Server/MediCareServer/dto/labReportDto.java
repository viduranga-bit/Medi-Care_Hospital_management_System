package com.Server.MediCareServer.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class labReportDto {
    private Long reportId;
    private String laboratarist_id;
    private String doc_id;
    private String reportName;
    private String patientName;
    private String doctorName;
    private String requestDate;
    private String patientId;

   

    
}
