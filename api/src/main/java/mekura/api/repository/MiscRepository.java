package mekura.api.repository;

import mekura.api.model.Misc;
import mekura.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MiscRepository extends JpaRepository<Misc, Long> {
    /*@Query("select m.id from Misc m where m.name= :name")
    Misc findMiscByName(@Param("name")String name);*/

    Optional<Misc> findMiscByName(String name);
}
