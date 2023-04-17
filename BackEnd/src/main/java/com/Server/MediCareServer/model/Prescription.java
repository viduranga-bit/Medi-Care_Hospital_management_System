package com.Server.MediCareServer.model;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="prescription")


public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long prescription_Id;

    @Column(name = "medication")
    private String medication;

    @Column(name = "Description")
    private String Description;

    @Column(name = "patient_id")
    private String patient_id;

    @Column(name = "doc_id")
    private String doc_id;

    @Column(name = "isRequestLabReport")
    private boolean isRequestLabReport;

    @Column(name = "symptoms")
    private String symptoms;

    @Column(name = "isIssuedMedicine")
    private Boolean isIssuedMedicine;

    @Column(name = "case_history")
    private String case_history;

    @Column(name = "medicine_issued_date")
    private Date medicine_issued_date;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_patientId")
    private Patient patient;

}

    

