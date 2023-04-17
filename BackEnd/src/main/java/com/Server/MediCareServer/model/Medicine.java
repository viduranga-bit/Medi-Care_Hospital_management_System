package com.Server.MediCareServer.model;

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
@Table(name="Medicine")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long medicineId;
    
    @Column(name = "medicineName")
    private String medicineName;

    @JsonFormat(pattern = "yyyy-MM-dd",shape = Shape.STRING)
    @Column(name = "date_added")
    private String date_added;

    @Column(name = "ManufacturingCompany")
    private String manufacturingCompany;
     
    @Temporal(TemporalType.TIME)
    @Column(name = "Time")
    private Date Time=new Date(System.currentTimeMillis());

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private String status;

    @Column(name = "itemCode")
    private String itemCode;

    @Column(name = "price")
    private String price;

    @Column(name = "sellingPrice")
    private String sellingPrice;

    @Column(name = "currentQuantity")
    private String currentQuantity;
  

}
