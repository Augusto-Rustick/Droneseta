package dsw.trabalho_final.spring_project.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import dsw.trabalho_final.spring_project.Entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

	@Query("SELECT c FROM Cliente c WHERE c.usuario = ?1")
	Cliente findByUser(String usuario);

	@Modifying
	@Query("UPDATE Cliente c SET c.usuario = :usuario, c.senha = :senha, c.endereco = :endereco, c.enderecoEntrega = :enderecoEntrega, c.cpf = :cpf, c.email = :email WHERE c.id = :id")
	void atualizarCliente(Integer id, String usuario, String senha, String endereco, String email, String enderecoEntrega, String cpf);

}