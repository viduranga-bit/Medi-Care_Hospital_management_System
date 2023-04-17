package com.Server.MediCareServer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Server.MediCareServer.exception.ResourseNotFoundException;
import com.Server.MediCareServer.model.DAOUser;
import com.Server.MediCareServer.model.UserDTO;
import com.Server.MediCareServer.repository.UserRepository;
import com.Server.MediCareServer.service.UserService;

@RestController
@RequestMapping("/api/v1/users")

public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping(value = "/{username}") // get user details
    public ResponseEntity<?> getAllUsers(@PathVariable String username) {
        DAOUser user = userService.getUserByUserName(username);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "role/{role}") // get users by role
    public ResponseEntity<List<DAOUser>> getUsersByRole(@PathVariable String role) {
        return new ResponseEntity<>(userService.getUserByRole(role), HttpStatus.OK);
    }

    @GetMapping(value = "get-all-users") // get users by role
    public ResponseEntity<List<DAOUser>> getAllUsers() {
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable(value = "id") long id) {
        DAOUser user = userRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("user not exist with id :" + id));
        // System.out.println(department);
        userRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
