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
import dsw.trabalho_final.spring_project.Entity.Usuario;
import dsw.trabalho_final.spring_project.Repository.UsuarioRepository;
import jakarta.validation.Valid;

@RestController
public class UsuarioResource {
    private UsuarioRepository repo;

    public UsuarioResource(UsuarioRepository repo) {
        this.repo = repo;
    }


    @PostMapping("/usuario/insert")
    public ResponseEntity<Usuario> createUsuario(@Valid @RequestBody Usuario usuario) {
        Usuario savedCar = repo.save(usuario);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id)")
                .buildAndExpand(savedCar.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/usuario/list")
    public List<Usuario> allUsuarios() {
        return repo.findAll();
    }

    @GetMapping("/usuario/get/{id}")
    public Usuario getUsuario(@PathVariable int id) throws Exception{
        Optional<Usuario> usuario = repo.findById(id);
        if(usuario.isEmpty()) {
            throw new Exception("erro no id: " + id);
        }
        return usuario.get();
    }

    @DeleteMapping("/usuario/delete/{id}")
    public void deleteUsuario(@PathVariable int id) {
        repo.deleteById(id);

    }
}
