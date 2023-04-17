package com.Server.MediCareServer.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Server.MediCareServer.model.Appointment;
import com.Server.MediCareServer.repository.AppointmentRepository;

import antlr.collections.List;

import java.*;

@RestController
@RequestMapping("/api/v1/appointments")
public class AppointmentController {
  
  @Autowired
  private AppointmentRepository appointmentRepository;
 
  
   

}