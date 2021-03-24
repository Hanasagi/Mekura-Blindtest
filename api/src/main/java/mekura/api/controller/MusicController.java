package mekura.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import mekura.api.DTO.MusicDTO;
import mekura.api.model.Music;
import mekura.api.repository.MusicRepository;
import mekura.api.service.MusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping(value="/api/v1/music")
public class MusicController {

    @Autowired
    private MusicService musicService;

    @Autowired
    private MusicRepository musicRepository;
    // get all users
    @GetMapping
    public List<Music> getAllEntry() {
        return musicRepository.findAll();
    }

    // create user rest api
    @PostMapping
    public MusicDTO createEntry(@RequestBody String entry) throws JsonProcessingException {
        System.out.println(entry);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode entryrObj = mapper.readTree(entry);
        System.out.println(entryrObj);
        JsonNode entryInfo = mapper.readTree(entryrObj.at("/entry").toString());
        MusicDTO entryDTO = new MusicDTO(entryInfo.get("source").toString(),entryInfo.get("link").toString(),entryInfo.get("type").toString(),entryInfo.get("uid").toString());
        System.out.println(entryDTO.toString());
        return musicService.save(entryDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity < MusicDTO > getEntryById(@PathVariable Long id) throws Exception {
        MusicDTO entry = musicService.findById(id);
        if (entry == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(entry);
    }

    // update user rest api

    @PutMapping("/{id}")
    public ResponseEntity < MusicDTO > updateEntry(@PathVariable Long id, @RequestBody MusicDTO miscDetails) throws Exception {
        MusicDTO entry = musicService.findById(id);
        entry.setSource(miscDetails.getSource());
        entry.setLink(miscDetails.getLink());
        entry.setType(miscDetails.getType());
        entry.setUid(miscDetails.getUid());

        MusicDTO updatedEntry = musicService.save(entry);
        return ResponseEntity.ok(updatedEntry);
    }

    // delete user rest api
    @DeleteMapping("/{id}")
    public ResponseEntity <Map< String, Boolean >> deleteEntry(@PathVariable Long id) throws Exception {
        MusicDTO entry = musicService.findById(id);
        musicService.delete(entry);
        Map < String, Boolean > response = new HashMap< >();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
