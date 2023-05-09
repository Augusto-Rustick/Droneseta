package dsw.trabalho_final.spring_project.Entity;

import jakarta.persistence.Entity;

@Entity
public class Cliente extends Pessoa {

	public Cliente() {
	}

	public Cliente(Integer id, String usuario, String senha) {
		super(id, usuario, senha, true);
	}
}
