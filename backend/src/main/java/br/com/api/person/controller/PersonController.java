package br.com.api.person.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.api.person.entities.Person;
import br.com.api.person.services.PersonService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;




@CrossOrigin(value = "http://localhost:5173")
@RestController
@RequestMapping(value = "persons")
public class PersonController {

    @Autowired
    private PersonService service;

    @GetMapping("/select")
    public ResponseEntity<List<Person>> select() {
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping("/insert")
    public ResponseEntity<?> insert(
        @RequestParam("name") String name,
        @RequestParam("city") String city,
        @RequestParam("img") MultipartFile img

    ) {
        try{
            Person p = service.insert(name, city, img);
            return ResponseEntity.status(201).body(p);
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Person p) {
       try{
        Person obj = service.update(id, p);
        return ResponseEntity.ok(obj);
       }catch(Exception e){
        return ResponseEntity.badRequest().body(e.getMessage());
       }
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try{
            service.delete(id);
            return ResponseEntity.noContent().build();
        }catch(Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> displayImage(@PathVariable Long id) {
        try{
            byte[] img = service.getImg(id);
            String extension = service.getExtension(id);

            return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(extension))
            .body(img);
        }catch(Exception e){
            return ResponseEntity.notFound().build();
        }
    }
    
    
    
}
