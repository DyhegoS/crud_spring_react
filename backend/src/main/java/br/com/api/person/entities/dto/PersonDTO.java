package br.com.api.person.entities.dto;

import br.com.api.person.entities.Person;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonDTO {
    private Long id;
    private String name;
    private String city;
    private byte[] img;
    private String extension;

    public PersonDTO(){
    }

    public PersonDTO(Long id, String name, String city) {
        this.id = id;
        this.name = name;
        this.city = city;
    }

    public PersonDTO(Person entity){
        id = entity.getId();
        name = entity.getName();
        city = entity.getCity();
        img = entity.getImg();
        extension = entity.getExtension();
    }
}
