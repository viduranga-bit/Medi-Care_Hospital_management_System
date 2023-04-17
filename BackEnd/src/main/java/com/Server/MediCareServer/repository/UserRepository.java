package com.Server.MediCareServer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Server.MediCareServer.model.DAOUser;
import com.Server.MediCareServer.model.UserDTO;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<DAOUser, Long> {
	DAOUser findByUsername(String username);

    @Query(value="SELECT * FROM user_tbl d WHERE d.role=?1", nativeQuery=true)
	public List<DAOUser> getDoctorByRole(String role);
}