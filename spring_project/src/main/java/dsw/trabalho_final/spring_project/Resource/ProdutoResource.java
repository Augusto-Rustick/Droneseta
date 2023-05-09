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
import dsw.trabalho_final.spring_project.Entity.Produto;
import dsw.trabalho_final.spring_project.Repository.ProdutoRepository;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProdutoResource {

	private ProdutoRepository repo;

	public ProdutoResource(ProdutoRepository repo) {
		this.repo = repo;
	}

	@PostMapping("/produto/insert")
	public ResponseEntity<?> createProduto(@Valid @RequestBody Produto produto) throws Exception {
		Produto savedProduto = repo.save(produto);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedProduto);
	}

	@GetMapping("/produto/list")
	public List<Produto> allProduto() {
		return repo.findAll();
	}

	@GetMapping("/produto/get/{id}")
	public ResponseEntity<?> getProduto(@PathVariable Integer id) {
		Optional<Produto> produtoOptional = repo.findById(id);
		if (!produtoOptional.isPresent()) {
			return ResponseEntity.badRequest().body("Não foi possível encontrar uma conta com esse usuário");
		}
		Produto produto = produtoOptional.get();
		return ResponseEntity.ok(produto);
	}

	@DeleteMapping("/produto/delete/{id}")
	public void deleteProduto(@PathVariable int id) {
		repo.deleteById(id);
	}
}
