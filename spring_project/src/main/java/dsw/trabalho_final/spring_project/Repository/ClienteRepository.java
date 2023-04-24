package dsw.trabalho_final.spring_project.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dsw.trabalho_final.spring_project.Entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

}