package mekura.api.model;

import org.hibernate.annotations.SQLInsert;

import javax.persistence.*;

@Entity
@Table(name="music")
@SQLInsert(sql = "INSERT IGNORE INTO music(source, link, type, uid) VALUES (?, ?, ?, ?)" )
public class Music {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String source;

    @Column
    private String link;

    @Column
    private String type;

    @Column
    private String uid;

    public Music(){}
    public Music(String source, String link, String type, String uid) {
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
}
