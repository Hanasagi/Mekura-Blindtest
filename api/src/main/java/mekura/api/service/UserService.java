package mekura.api.service;

import mekura.api.DTO.UserDTO;
import mekura.api.model.User;
import mekura.api.repository.UserRepository;
import mekura.api.converter.UserConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserConverter userConverter;

    public UserDTO findByUsername(String username) throws Exception {
        User user = userRepository.findByUsername(username).orElseThrow(Exception::new);
        return userConverter.convertFrom(user, UserDTO.class);
    }

    public UserDTO findById(Long id) throws Exception {
        User user = userRepository.findById(id).orElseThrow(Exception::new);
        return userConverter.convertFrom(user, UserDTO.class);
    }

    public UserDTO save(UserDTO userDTO){
        User user = userConverter.convertTo(userDTO,User.class);
        userRepository.save(user);
        return userDTO;
    }

    public void delete(UserDTO userDTO){
        User user = userConverter.convertTo(userDTO,User.class);
        userRepository.delete(user);
    }

}
