package dsw.trabalho_final.spring_project.Resource;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import dsw.trabalho_final.spring_project.Entity.Administrador;
import dsw.trabalho_final.spring_project.Repository.AdministradorRepository;
import jakarta.validation.Valid;

@RestController
public class AdministradorResource {

	private AdministradorRepository adminRepo;

	public AdministradorResource( AdministradorRepository adminRepo) {
		this.adminRepo = adminRepo;
	}
	
	 @PostMapping("/administrador/insert")
	    public ResponseEntity<Administrador> createAdministrador(@Valid @RequestBody Administrador administrador) {
		 Administrador savedAdministrador= adminRepo.save(administrador);
	        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id)")
	                .buildAndExpand(savedAdministrador.getId())
	                .toUri();
	        return ResponseEntity.created(location).build();
	    }

	    @GetMapping("/administrador/list")
	    public List<Administrador> allAdministrador() {
	        return adminRepo.findAll();
	    }

	    @GetMapping("/administrador/get/{id}")
	    public Administrador getAdministrador(@PathVariable int id) throws Exception{
	        Optional<Administrador> administrador = adminRepo.findById(id);
	        if(administrador.isEmpty()) {
	            throw new Exception("erro no id: " + id);
	        }
	        return administrador.get();
	    }

	    @DeleteMapping("/administrador/delete/{id}")
	    public void deleteAdministrador(@PathVariable int id) {
	    	adminRepo.deleteById(id);
	    }
	
}
