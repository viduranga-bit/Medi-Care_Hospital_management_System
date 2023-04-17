package com.Server.MediCareServer.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Server.MediCareServer.model.LabReport;
import com.Server.MediCareServer.repository.LabReportRepository;
import com.Server.MediCareServer.dto.labReportDto;
@Service
public class labReportService {

    @Autowired
    LabReportRepository labReportRepository;


    public void createPdfFile(long id,String fileName,String fileType,byte[] data) {
      
        Optional<LabReport> optionalPdfFile = labReportRepository.findById(id);
        if(optionalPdfFile.isPresent()){
        LabReport pdfFile = optionalPdfFile.get();
        pdfFile.setFileName(fileName);
        pdfFile.setContent(data);
        pdfFile.setFileType(fileType);
        labReportRepository.save(pdfFile);
       }else {
      throw new EntityNotFoundException("PdfFile not found with id: " + id);
       }
    }
    
    public LabReport savePriceForLabReport(Long labReportId, Double price) {
        Optional<LabReport> optionalLabReport = labReportRepository.findById(labReportId);
        
        if (optionalLabReport.isPresent()) {
            LabReport labReport = optionalLabReport.get();
            labReport.setPrice(price);
            return labReportRepository.save(labReport);
        } else {
            throw new IllegalArgumentException("LabReport with ID " + labReportId + " not found");
        }
    }


public String getNameById(Long rId){
    String name=labReportRepository.getPatientNameFromId(rId);
    return name;
}

public List<labReportDto> getlabDetails(){
    List<labReportDto> labReportDetail = labReportRepository.getLabreportDetails();
    return labReportDetail;

}

public Optional<LabReport> getLabReportById(long pid) {
    Optional<LabReport> labReport = labReportRepository.findById(pid);
    return labReport;
}
}