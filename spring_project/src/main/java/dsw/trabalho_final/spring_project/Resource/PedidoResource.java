package dsw.trabalho_final.spring_project.Resource;

import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import dsw.trabalho_final.spring_project.Entity.Pedido;
import dsw.trabalho_final.spring_project.Repository.PedidoRepository;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PedidoResource {

	private PedidoRepository repo;

	public PedidoResource(PedidoRepository repo) {
		this.repo = repo;
	}

	@PostMapping("/pedido/insert")
	public ResponseEntity<?> createPedido(@Valid @RequestBody Pedido pedido) throws Exception {
		Pedido savedPedido = repo.save(pedido);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedPedido);
	}

	@GetMapping("/pedido/list")
	public List<Pedido> allPedido() {
		return repo.findAll();
	}

	@GetMapping("/pedido/listUser/{id}")
	public List<Pedido> allPedidoByCliente(@PathVariable Integer id) {
		return repo.findByClienteId(id);
	}

	@PutMapping("/pedido/update/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void atualizarSituacaoPedido(@PathVariable Integer id) {
		repo.atualizarSituacaoPedido(id);
	}

	@GetMapping("/pedido/get/{id}")
	public ResponseEntity<?> getPedido(@PathVariable Integer id) {
		Optional<Pedido> pedidoOptional = repo.findById(id);
		if (!pedidoOptional.isPresent()) {
			return ResponseEntity.badRequest().body("Não foi possível encontrar uma conta com esse usuário");
		}
		Pedido pedido = pedidoOptional.get();
		return ResponseEntity.ok(pedido);
	}

	@DeleteMapping("/pedido/delete/{id}")
	public void deletePedido(@PathVariable int id) {
		repo.deleteById(id);
	}
}
