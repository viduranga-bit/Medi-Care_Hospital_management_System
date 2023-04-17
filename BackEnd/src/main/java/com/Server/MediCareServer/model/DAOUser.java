package com.Server.MediCareServer.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity(name = "userdetail")
@Table(name = "user_tbl")

public class DAOUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column
	private String username;
	@Column
	private String password;
	@Column
	private String role;
	@Column
	private String phone;
	@Column
	private String name;
	@Column
	private String email;
	@Column
	private String address;
	@Column
	private int roleid;

	public long getId() {
		return id;
	}

	public void setId(long id) {
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

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAddress() {
		return address;
	}

	
}
