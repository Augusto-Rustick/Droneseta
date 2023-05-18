package dsw.trabalho_final.spring_project.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import dsw.trabalho_final.spring_project.Entity.Pedido;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
   @Query("SELECT p FROM Pedido p WHERE p.situacao = 1 AND p.cliente = :clienteId")
   List<Pedido> findByClienteId(@Param("clienteId") Integer clienteId);

   @Query("SELECT p, prod FROM Pedido p JOIN p.produto prod WHERE p.cliente = 1")
   List<?> findByClienteIdWithProduto(@Param("clienteId") Integer clienteId);

   @Modifying
   @Query("UPDATE Pedido p SET p.situacao = 2 WHERE p.id = :id")
   void atualizarSituacaoPedido(Integer id);
}
