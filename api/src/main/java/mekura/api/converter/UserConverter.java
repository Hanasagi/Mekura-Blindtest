package mekura.api.converter;

import mekura.api.converter.AbstractDTOConverter;
import mekura.api.model.User;
import mekura.api.DTO.UserDTO;
import org.springframework.stereotype.Service;

@Service
public class UserConverter extends AbstractDTOConverter<User, UserDTO> {
}