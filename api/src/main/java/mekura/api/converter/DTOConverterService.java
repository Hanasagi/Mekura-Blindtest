package mekura.api.converter;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DTOConverterService {

    @Autowired
    private UserConverter userConverter;

    public UserConverter userConverter() {
        return userConverter;
    }
}