package br.com.api.person.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.api.person.entities.Person;

@Repository
public interface PersonRepository extends CrudRepository<Person, Long>{
    List<Person> findAll();
}
