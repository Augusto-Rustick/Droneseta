package dsw.trabalho_final.spring_project.Entity;

import jakarta.persistence.Entity;

@Entity
public class Administrador extends Pessoa {

	public Administrador() {
	}

	public Administrador(Integer id, String usuario, String senha) {
		super(id, usuario, senha, true);
	}
}
