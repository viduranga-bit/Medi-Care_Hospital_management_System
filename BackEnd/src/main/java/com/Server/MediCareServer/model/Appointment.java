package com.Server.MediCareServer.model;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Appointments")

public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long appointment_Id;
    @Column(name = "appointment_timestamp")
    private String deptName;
    @Column(name = "Description")
    private String Description;
    

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_patientId")
    private Patient patient;

}

    

