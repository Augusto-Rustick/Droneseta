package dsw.trabalho_final.spring_project.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import dsw.trabalho_final.spring_project.Entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

}
