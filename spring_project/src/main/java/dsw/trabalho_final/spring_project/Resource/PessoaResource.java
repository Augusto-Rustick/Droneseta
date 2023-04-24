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

import dsw.trabalho_final.spring_project.Entity.Pessoa;
import dsw.trabalho_final.spring_project.Repository.PessoaRepository;
import jakarta.validation.Valid;

@RestController
public class PessoaResource {
    private PessoaRepository repo;

    public PessoaResource(PessoaRepository repo) {
        this.repo = repo;
    }


    @PostMapping("/pessoa/insert")
    public ResponseEntity<Pessoa> createPessoa(@Valid @RequestBody Pessoa pessoa) {
    	Pessoa savedPessoa= repo.save(pessoa);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id)")
                .buildAndExpand(savedPessoa.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/pessoa/list")
    public List<Pessoa> allPessoas() {
        return repo.findAll();
    }

    @GetMapping("/pessoa/get/{id}")
    public Pessoa getPessoa(@PathVariable int id) throws Exception{
        Optional<Pessoa> pessoa = repo.findById(id);
        if(pessoa.isEmpty()) {
            throw new Exception("erro no id: " + id);
        }
        return pessoa.get();
    }

    @DeleteMapping("/pessoa/delete/{id}")
    public void deletePessoa(@PathVariable int id) {
        repo.deleteById(id);
    }
}
