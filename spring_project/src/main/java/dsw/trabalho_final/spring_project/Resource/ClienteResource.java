package dsw.trabalho_final.spring_project.Resource;

import java.net.URI;
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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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
	public ResponseEntity<Cliente> createCliente(@Valid @RequestBody Cliente cliente) throws Exception {
	    Cliente savedCliente = clienteRepo.save(cliente);
	    savedCliente.setId(savedCliente.getId()); // atribui o id do cliente salvo ao objeto Cliente
	    return ResponseEntity.status(HttpStatus.CREATED).body(savedCliente); // retorna o cliente criado com o status 201
	}

	@GetMapping("/cliente/list")
	public List<Cliente> allCliente() {
		return clienteRepo.findAll();
	}

	@GetMapping("/cliente/get/{id}")
	public Cliente getCliente(@PathVariable int id) throws Exception {
		Optional<Cliente> cliente = clienteRepo.findById(id);
		if (cliente.isEmpty()) {
			throw new Exception("erro no id: " + id);
		}
		return cliente.get();
	}

	@DeleteMapping("/cliente/delete/{id}")
	public void deleteCliente(@PathVariable int id) {
		clienteRepo.deleteById(id);
	}

}