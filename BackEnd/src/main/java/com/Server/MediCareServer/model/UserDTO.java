package com.Server.MediCareServer.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

public class UserDTO {
	private long id;	
	private String username;
	private String password;
	private String role;
	private String phone;
	private String name;
	private String email;
	private String address;
	private int roleid;

	public UserDTO() {
	}

	public UserDTO(String username, String password) {
		this.username = username;
		this.password = password;
	}

	public UserDTO(long id,String username, String password, String role, String phone, String name, String email,String address, int roleid) {
		this.id=id;
		this.username = username;
		this.password = password;
		this.role = role;
		this.phone = phone;
		this.name = name;
		this.email = email;
		this.address = address;
		this.roleid = roleid;
	}
   
	public long getId() {
		return id;
	}

	public void setId(long role) {
		this.id = id;
	}
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
    public int getRoleId() {
		return roleid;
	}

	public void setRoleId(int roleid) {
		this.roleid = roleid;
	}
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}	
    public String getAddress() {
		return address;
	}

	public void setEAddress(String address) {
		this.address = address;
	}	

	@ManyToMany(mappedBy = "patient_User")
	private Set<Patient> patientsSet = new HashSet<>();	

	
    
}
