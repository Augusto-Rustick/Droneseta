package dsw.trabalho_final.spring_project.Repository;

import dsw.trabalho_final.spring_project.Entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import dsw.trabalho_final.spring_project.Entity.Cartao;

import java.util.List;

@Repository
public interface CartaoRepository extends JpaRepository<Cartao, Integer> {
   @Query("SELECT c FROM Cartao c WHERE c.cliente = :clienteId")
   List<Cartao> findByClienteId(@Param("clienteId") Integer clienteId);
}
