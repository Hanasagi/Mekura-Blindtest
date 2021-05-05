package mekura.api.service;

import mekura.api.DTO.MusicDTO;
import mekura.api.converter.MusicConverter;
import mekura.api.model.Music;
import mekura.api.repository.MusicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class MusicService {
    @Autowired
    MusicRepository musicRepository;

    @Autowired
    MusicConverter musicConverter;

    public MusicDTO findById(Long id) throws Exception {
        Music entry = musicRepository.findById(id).orElseThrow(Exception::new);
        return musicConverter.convertFrom(entry, MusicDTO.class);
    }

    public List<MusicDTO> findByTypeRandom(String type){
        List<Music> entry = musicRepository.getRandomByType(type);
        return musicConverter.convertFrom(entry, MusicDTO.class);
    }

    public MusicDTO save(MusicDTO entryDTO){
        Music entry = musicConverter.convertTo(entryDTO,Music.class);
        musicRepository.save(entry);
        return entryDTO;
    }

    public void delete(MusicDTO entryDTO){
        Music entry = musicConverter.convertTo(entryDTO,Music.class);
        musicRepository.delete(entry);
    }
}
