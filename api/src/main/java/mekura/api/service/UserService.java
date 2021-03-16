package mekura.api.service;

import mekura.api.DTO.UserDTO;
import mekura.api.model.User;
import mekura.api.repository.UserRepository;
import mekura.api.converter.UserConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserConverter userConverter;

    public UserDTO findById(Long id) throws Exception {
        User user = userRepository.findById(id).orElseThrow(Exception::new);
        return userConverter.convertFrom(user, UserDTO.class);
    }

    public UserDTO save(UserDTO userDTO){
        User user = userConverter.convertTo(userDTO,User.class);
        System.out.println(user.toString());
        userRepository.save(user);
        return userDTO;
    }

    public void delete(UserDTO userDTO){
        User user = userConverter.convertTo(userDTO,User.class);
        userRepository.delete(user);
    }

    public List<UserDTO> convertFrom(List<User> lF, Class<UserDTO> t) {
        List<UserDTO> lT = new LinkedList<>();

        for (User f: lF) {
            lT.add(userConverter.convertFrom(f, t));
        }

        return lT;
    }
}
