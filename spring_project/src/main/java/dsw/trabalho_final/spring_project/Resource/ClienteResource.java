package dsw.trabalho_final.spring_project.Resource;

import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import dsw.trabalho_final.spring_project.Entity.Cliente;
import dsw.trabalho_final.spring_project.Repository.ClienteRepository;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ClienteResource {

	private ClienteRepository clienteRepo;

	public ClienteResource(ClienteRepository clienteRepo) {
		this.clienteRepo = clienteRepo;
	}

	@PostMapping("/cliente/insert")
	public ResponseEntity<?> createCliente(@Valid @RequestBody Cliente cliente) throws Exception {
		if (clienteRepo.findByUser(cliente.getUsuario()) != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome de usuário já cadastrado no sistema.");
		}
		Cliente savedCliente = clienteRepo.save(cliente);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedCliente);
	}

	@GetMapping("/cliente/list")
	public List<Cliente> allCliente() {
		return clienteRepo.findAll();
	}

	@GetMapping("/cliente/get/{usuario}")
	public ResponseEntity<?> getCliente(@PathVariable String usuario) {
		Optional<Cliente> clienteOptional = Optional.ofNullable(clienteRepo.findByUser(usuario));
		if (!clienteOptional.isPresent()) {
			return ResponseEntity.badRequest().body("Não foi possível encontrar uma conta com esse usuário");
		}
		Cliente cliente = clienteOptional.get();
		return ResponseEntity.ok(cliente);
	}

	@DeleteMapping("/cliente/delete/{id}")
	public void deleteCliente(@PathVariable int id) {
		clienteRepo.deleteById(id);
	}

}