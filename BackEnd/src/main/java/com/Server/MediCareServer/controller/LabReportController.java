package com.Server.MediCareServer.controller;

import com.Server.MediCareServer.dto.labReportDto;
import com.Server.MediCareServer.model.LabReport;
import com.Server.MediCareServer.repository.LabReportRepository;
import com.Server.MediCareServer.service.labReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/labReport")
public class LabReportController {

    @Autowired
    private LabReportRepository labreportRepository;

    @Autowired
    private labReportService labReportService;

    @PostMapping
    public LabReport createLabReport(@RequestBody LabReport labReport) {
        return labreportRepository.save(labReport);
    }

    @GetMapping // get labreport details
    public List<LabReport> getAllLabReports() {
        return (List<LabReport>) labreportRepository.findAll();
    }

    @PostMapping("/upload/{pid}")
    public ResponseEntity<String> uploadPdfFile(@PathVariable("pid") Long id,
            @RequestParam("file") MultipartFile file) {
        try {
            labReportService.createPdfFile(id, file.getOriginalFilename(),file.getContentType(), file.getBytes());
            return ResponseEntity.ok("File uploaded successfully with id: " + LabReport.class.getName());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload file: " + e.getMessage());
        }
    }

    @GetMapping("/download/{lid}")
    public ResponseEntity<ByteArrayResource> downloadFile( @PathVariable(value = "lid")  Long reportId) {

        LabReport doc = labReportService.getLabReportById(reportId).get();
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(doc.getFileType()))
                .header("Content-Disposition", "inline;filename=\"" + doc.getFileName() + "\"")
                .body(new ByteArrayResource(doc.getContent()));
    }

    @PostMapping("/{lid}/500")
    public ResponseEntity<LabReport> updateLabReportPrice(@PathVariable(value = "lid") Long labReportId,
            @RequestParam(value = "price") Double price) {
        System.out.println("labReportId");
        LabReport updatedLabReport = labReportService.savePriceForLabReport(labReportId, price);
        return ResponseEntity.ok(updatedLabReport);
    }

    @GetMapping("/get-name-by-id/{rId}")
    public String getNameById(@PathVariable("rId") Long rId) {
        return labReportService.getNameById(rId);
    }

    @GetMapping("/get-lab-details")
    public List<labReportDto> getlabDetails() {
        return labReportService.getlabDetails();
    }

    @GetMapping(value = "/{pid}") // get patient by patient ID
    public ResponseEntity<?> getPatinetByID(@PathVariable long pid) {
        Optional<LabReport> patient = labReportService.getLabReportById(pid);

        if (patient != null) {
            return new ResponseEntity<>(patient, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
