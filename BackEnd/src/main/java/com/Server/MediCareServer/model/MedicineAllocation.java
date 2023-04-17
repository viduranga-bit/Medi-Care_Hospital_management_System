package com.Server.MediCareServer.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;



        import java.sql.Time;
        import java.util.Date;
        import java.util.HashSet;
        import java.util.Set;

        import javax.persistence.*;

        import org.springframework.format.annotation.DateTimeFormat;

        import com.fasterxml.jackson.annotation.JsonFormat;
        import com.fasterxml.jackson.annotation.JsonFormat.Shape;

        import lombok.AllArgsConstructor;
        import lombok.Getter;
        import lombok.NoArgsConstructor;
        import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="MedicineAllocation ")
public class MedicineAllocation  {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long issueId;

    @Column(name = "medicineName")
    private String medicineName;


    @Column(name = "pharmacistID")
    private String pharmacistID;

    @Column(name = "medicineID")
    private String medicineID;

    @Column(name = "medicineCode")
    private String MedicineCode;

    @Column(name = "patientId")
    private String patientId;

    @Temporal(TemporalType.TIME)
    @Column(name = "Time")
    private Date Time=new Date(System.currentTimeMillis());

    @Column(name = "qunataty")
    private String qunataty;


}
