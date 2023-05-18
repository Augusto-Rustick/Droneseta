package dsw.trabalho_final.spring_project.Resource;

import java.util.List;
import java.util.Optional;
//import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.NoSuchElementException;
import dsw.trabalho_final.spring_project.Entity.Cliente;
import dsw.trabalho_final.spring_project.Repository.ClienteRepository;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000",
		methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE},
		allowedHeaders = {"Content-Type", "Authorization"},
		allowCredentials = "true")
@RestController
public class ClienteResource {

	private ClienteRepository repo;

	public ClienteResource(ClienteRepository repo) {
		this.repo = repo;
	}

	@PostMapping("/cliente/insert")
	public ResponseEntity<?> createCliente(@Valid @RequestBody Cliente cliente) throws Exception {
		if (repo.findByUser(cliente.getUsuario()) != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome de usuário já cadastrado no sistema.");
		}
		Cliente savedCliente = repo.save(cliente);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedCliente);
	}

	@PutMapping("/cliente/update")
	public ResponseEntity<Cliente> atualizarCliente(@RequestBody Cliente clienteAtualizado) {
		Integer id = clienteAtualizado.getId();
		Optional<Cliente> clienteOptional = repo.findById(id);
		Cliente cliente = clienteOptional.orElseThrow(NoSuchElementException::new);
		cliente.setSenha(clienteAtualizado.getSenha());
		cliente.setEndereco(clienteAtualizado.getEndereco());
		cliente.setEmail(clienteAtualizado.getEmail());
		Cliente clienteFinalizado = repo.save(cliente);
		return ResponseEntity.ok(clienteFinalizado);
	}



	@GetMapping("/cliente/list")
	public List<Cliente> allCliente() {
		return repo.findAll();
	}

	@GetMapping("/cliente/get/{usuario}")
	public ResponseEntity<?> getCliente(@PathVariable String usuario) {
		Optional<Cliente> clienteOptional = Optional.ofNullable(repo.findByUser(usuario));
		if (!clienteOptional.isPresent()) {
			return ResponseEntity.badRequest().body("Não foi possível encontrar uma conta com esse usuário");
		}
		Cliente cliente = clienteOptional.get();
		return ResponseEntity.ok(cliente);
	}

	@DeleteMapping("/cliente/delete/{id}")
	public void deleteCliente(@PathVariable int id) {
		repo.deleteById(id);
	}

}