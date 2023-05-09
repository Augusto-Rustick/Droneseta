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
import dsw.trabalho_final.spring_project.Entity.Administrador;
import dsw.trabalho_final.spring_project.Repository.AdministradorRepository;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AdministradorResource {

	private AdministradorRepository adminRepo;

	public AdministradorResource(AdministradorRepository adminRepo) {
		this.adminRepo = adminRepo;
	}

	@PostMapping("/administrador/insert")
	public ResponseEntity<?> createAdministrador(@Valid @RequestBody Administrador administrador) throws Exception {
		if (adminRepo.findByUser(administrador.getUsuario()) != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome de usuário já cadastrado no sistema.");
		}
		Administrador savedAdmin = adminRepo.save(administrador);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedAdmin);
	}

	@GetMapping("/administrador/list")
	public List<Administrador> allAdministrador() {
		return adminRepo.findAll();
	}

	@GetMapping("/administrador/get/{usuario}")
	public ResponseEntity<?> getAdministrador(@PathVariable String usuario) {
		Optional<Administrador> administradorOptional = Optional.ofNullable(adminRepo.findByUser(usuario));
		if (!administradorOptional.isPresent()) {
			return ResponseEntity.badRequest().body("Não foi possível encontrar uma conta com esse usuário");
		}
		Administrador administrador = administradorOptional.get();
		return ResponseEntity.ok(administrador);
	}

	@DeleteMapping("/administrador/delete/{id}")
	public void deleteAdministrador(@PathVariable int id) {
		adminRepo.deleteById(id);
	}

}
