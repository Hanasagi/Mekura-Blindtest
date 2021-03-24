package mekura.api.converter;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DTOConverterService<MusiccConverter> {

    @Autowired
    private UserConverter userConverter;

    public UserConverter userConverter() {
        return userConverter;
    }

    @Autowired
    private MiscConverter miscConverter;

    public MiscConverter miscConverter(){return miscConverter;}

    @Autowired
    private MusicConverter musicConverter;

    public MusicConverter musicConverter(){return musicConverter;}
}