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

import dsw.trabalho_final.spring_project.Entity.Cartao;
import dsw.trabalho_final.spring_project.Entity.Cliente;
import dsw.trabalho_final.spring_project.Repository.CartaoRepository;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CartaoResource {

	private CartaoRepository cartaoRepo;

	public CartaoResource(CartaoRepository cartaoRepo) {
		this.cartaoRepo = cartaoRepo;
	}
	
	@PostMapping("/cartao/insert")
	public ResponseEntity<?> createCartao(@Valid @RequestBody Cartao cartao) throws Exception {
		Cartao savedCartao= cartaoRepo.save(cartao);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedCartao);
	}

	@GetMapping("/cartao/list")
	public List<Cartao> allCartao() {
		return cartaoRepo.findAll();
	}

	@GetMapping("/cartao/get/{id}")
	public ResponseEntity<?> getCartao(@PathVariable Integer id) {
		Optional<Cartao> cartaoOptional = cartaoRepo.findById(id);
		if (!cartaoOptional.isPresent()) {
			return ResponseEntity.badRequest().body("Não foi possível encontrar uma conta com esse usuário");
		}
		Cartao cartao = cartaoOptional.get();
		return ResponseEntity.ok(cartao);
	}

	@DeleteMapping("/cartao/delete/{id}")
	public void deleteCartao(@PathVariable int id) {
		cartaoRepo.deleteById(id);
	}
}
