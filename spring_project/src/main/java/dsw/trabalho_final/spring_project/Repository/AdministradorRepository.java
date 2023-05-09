package dsw.trabalho_final.spring_project.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import dsw.trabalho_final.spring_project.Entity.Administrador;

public interface AdministradorRepository extends JpaRepository<Administrador, Integer> {

	@Query("SELECT a FROM Administrador a WHERE a.usuario = ?1")
	Administrador findByUser(String usuario);
}