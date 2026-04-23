package br.com.api.person.services;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import br.com.api.person.entities.Person;
import br.com.api.person.entities.dto.PersonDTO;
import br.com.api.person.repositories.PersonRepository;
import br.com.api.person.services.exceptions.ResourceNotFoundException;


@Service
public class PersonService {

    @Autowired
    private PersonRepository repository;

    
    @Transactional(readOnly = true)
    public List<Person> findAll(){
        List<Person> result = repository.findAll();
        return result;
    }

    @Transactional(readOnly = true)
    public PersonDTO findById(Long id){
        return new PersonDTO(searchById(id));
    }

    public Person insert(String name, String city, MultipartFile img) throws IOException{
        if(name == null || name.isEmpty()){
            throw new IllegalArgumentException("O Nome é obrigatório!");
        }
        if(city == null || city.isEmpty()){
            throw new IllegalArgumentException("A cidade é obrigatório!");
        }
        if(img == null || img.isEmpty()){
            throw new IllegalArgumentException("A imagem é obrigatório!");
        }

        Person p = new Person();
        p.setName(name);
        p.setCity(city);
        p.setImg(img.getBytes());
        p.setExtension(img.getContentType());

        return repository.save(p);
    }

    public Person update(Long id, Person p){
        if(p.getName() == null || p.getName().isEmpty()){
            throw new IllegalArgumentException("O Nome é obrigatório!");
        }
        if(p.getCity() == null || p.getCity().isEmpty()){
            throw new IllegalArgumentException("A cidade é obrigatório!");
        }

        p.setId(id);
        Person obj = searchById(id);

        p.setImg(obj.getImg());
        p.setExtension(obj.getExtension());

        return repository.save(p);
    }

    // @Transactional
    // public PersonDTO insert(PersonDTO dto){
    //     Person entity = new Person();
    //     entity.setId(dto.getId());
    //     entity.setName(dto.getName());
    //     entity.setCity(dto.getCity());
    //     entity = repository.save(entity);
    //     return new PersonDTO(entity);
    // }

    // @Transactional
    // public PersonDTO update(Long id, PersonDTO dto){
    //     Person person = searchById(id);
    //     person.setName(dto.getName());
    //     person.setCity(dto.getCity());

    //     person = repository.save(person);
    //     return new PersonDTO(person);
    // }

    @Transactional
    public void delete(Long id){
        searchById(id);

        repository.deleteById(id);
    }

    public byte[] getImg(Long id){
        Person p = searchById(id);
        return p.getImg();
    }

    public String getExtension(Long id){
        Person p = searchById(id);
        return p.getExtension();
    }

    private Person searchById(Long id){
        Person person = repository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Pessoa não encontrada!"));
        return person;
    }
}
