package mekura.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import mekura.api.DTO.MiscDTO;
import mekura.api.model.Misc;
import mekura.api.repository.MiscRepository;
import mekura.api.service.MiscService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping(value="/api/v1/misc")
public class MiscController {

    @Autowired
    private MiscService miscService;

    @Autowired
    private MiscRepository miscRepository;
    // get all users
    @GetMapping
    public List<Misc> getAllEntry() {
        return miscRepository.findAll();
    }

    // create user rest api
    @PostMapping
    public MiscDTO createEntry(@RequestBody String entry) throws JsonProcessingException {
        System.out.println(entry);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode entryrObj = mapper.readTree(entry);
        System.out.println(entryrObj);
        JsonNode entryInfo = mapper.readTree(entryrObj.at("/misc").asText());
        System.out.println(entryInfo.get("name"));
        System.out.println(entryrObj.at("/misc/name"));
        System.out.println(entryrObj.at("/misc/value"));
        MiscDTO entryDTO = new MiscDTO(entryrObj.at("/misc").get("name").toString(),entryrObj.at("/misc").get("value").toString());
        System.out.println(entryDTO.toString());
        return miscService.save(entryDTO);
    }

    // get user by id rest api
    @PostMapping("/search")
    public ResponseEntity< MiscDTO > getMiscByName(@RequestBody String name) throws IllegalArgumentException,Exception {
        System.out.println(name);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode nameObj = mapper.readTree(name);
        String n = nameObj.at("/name").toString();
        System.out.println(n);
        MiscDTO misc = miscService.findMiscByName(n);
        System.out.println(misc);
        if (misc == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(misc);
    }

    @GetMapping("/{id}")
    public ResponseEntity < MiscDTO > getEntryById(@PathVariable Long id) throws Exception {
        MiscDTO entry = miscService.findById(id);
        if (entry == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(entry);
    }

    // update user rest api

    @PutMapping("/{id}")
    public ResponseEntity < MiscDTO > updateEntry(@PathVariable Long id, @RequestBody MiscDTO miscDetails) throws Exception {
        MiscDTO entry = miscService.findById(id);
        entry.setName(miscDetails.getName());
        entry.setValue(miscDetails.getValue());
        MiscDTO updatedEntry = miscService.save(entry);
        return ResponseEntity.ok(updatedEntry);
    }

    // delete user rest api
    @DeleteMapping("/{id}")
    public ResponseEntity <Map< String, Boolean >> deleteEntry(@PathVariable Long id) throws Exception {
        MiscDTO entry = miscService.findById(id);
        miscService.delete(entry);
        Map < String, Boolean > response = new HashMap< >();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
