package mekura.api.DTO;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class UserDTO {
    private long id;
    public String username;
    public String profilePic;
    public String token;

    public UserDTO(){}
    public UserDTO(String username, String profilePic, String token) {
        this.username = username;
        this.profilePic = profilePic;
        this.token = token;
    }
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getProfilePic() {
        return profilePic;
    }
    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", profilePic='" + profilePic + '\'' +
                ", token='" + token + '\'' +
                '}';
    }
}
