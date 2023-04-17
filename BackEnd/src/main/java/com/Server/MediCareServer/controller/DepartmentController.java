package com.Server.MediCareServer.controller;

import com.Server.MediCareServer.exception.ResourseNotFoundException;
import com.Server.MediCareServer.model.Department;
import com.Server.MediCareServer.repository.DepartmentRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequestMapping("/api/v1/departments")
public class DepartmentController {
    @Autowired
   private DepartmentRepository departmentRepository;
    @GetMapping //get deprtment details
    public List<Department> getAllDepartments(){
        return (List<Department>) departmentRepository.findAll();
    }
    //build create department REST API
    @PostMapping
    public Department createDepartment(@RequestBody Department department){
        return departmentRepository.save(department);

    }
    // Delete department record

    @DeleteMapping("{dept_Id}")
    public ResponseEntity<HttpStatus> deleteDepartment(@PathVariable(value = "dept_Id") long dept_Id){
       Department department = departmentRepository.findById(dept_Id)
               .orElseThrow(() ->new ResourseNotFoundException("Department not exist with id :"+dept_Id));
      // System.out.println(department);
       departmentRepository.deleteById(dept_Id);

       return new ResponseEntity<>(HttpStatus.OK);
    }

}
