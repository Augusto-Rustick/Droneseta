package dsw.trabalho_final.spring_project.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dsw.trabalho_final.spring_project.Entity.Cartao;

@Repository
public interface CartaoRepository extends JpaRepository<Cartao, Integer> {

}
