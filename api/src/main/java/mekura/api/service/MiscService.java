package mekura.api.service;

import mekura.api.DTO.MiscDTO;
import mekura.api.converter.MiscConverter;
import mekura.api.model.Misc;
import mekura.api.repository.MiscRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MiscService {

    @Autowired
    MiscRepository miscRepository;

    @Autowired
    MiscConverter miscConverter;

    public MiscDTO findMiscByName(String name) throws Exception {
        System.out.println(name);
        Misc miscEntry = miscRepository.findMiscByName(name).orElseThrow(Exception::new);
        return miscConverter.convertFrom(miscEntry, MiscDTO.class);
    }

    public MiscDTO findById(Long id) throws Exception {
        Misc entry = miscRepository.findById(id).orElseThrow(Exception::new);
        return miscConverter.convertFrom(entry, MiscDTO.class);
    }

    public MiscDTO save(MiscDTO entryDTO){
        Misc entry = miscConverter.convertTo(entryDTO,Misc.class);
        miscRepository.save(entry);
        return entryDTO;
    }

    public void delete(MiscDTO entryDTO){
        Misc entry = miscConverter.convertTo(entryDTO,Misc.class);
        miscRepository.delete(entry);
    }
}
