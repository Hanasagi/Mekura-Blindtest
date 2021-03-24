package mekura.api.DTO;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class MusicDTO {
    private long id;
    private String source;
    private String link;
    private String type;
    private String uid;

    public MusicDTO(){}

    public MusicDTO(String source, String link, String type, String uid) {
        this.source = source;
        this.link = link;
        this.type = type;
        this.uid = uid;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    @Override
    public String toString() {
        return "MusicDTO{" +
                "id=" + id +
                ", source='" + source + '\'' +
                ", link='" + link + '\'' +
                ", type='" + type + '\'' +
                ", uid='" + uid + '\'' +
                '}';
    }
}
