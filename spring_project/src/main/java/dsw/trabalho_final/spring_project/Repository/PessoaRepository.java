package dsw.trabalho_final.spring_project.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dsw.trabalho_final.spring_project.Entity.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Integer> {

}
