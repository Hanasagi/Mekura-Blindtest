package mekura.api.repository;

import mekura.api.model.Music;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MusicRepository extends JpaRepository<Music, Long> {
    @Query(nativeQuery = true,value="select * from Music m where m.type=:type order by rand() limit 10")
    List<Music> getRandomByType(@Param("type")String type);
}