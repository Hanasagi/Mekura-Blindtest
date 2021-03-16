package mekura.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mekura.api.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}