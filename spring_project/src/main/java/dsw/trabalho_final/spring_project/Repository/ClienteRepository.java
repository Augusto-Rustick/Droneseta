package dsw.trabalho_final.spring_project.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import dsw.trabalho_final.spring_project.Entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
	
	@Query("SELECT c FROM Cliente c WHERE c.usuario = ?1")
	Cliente findByUser(String usuario);
}