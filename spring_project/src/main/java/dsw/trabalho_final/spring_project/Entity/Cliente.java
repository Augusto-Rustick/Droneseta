package dsw.trabalho_final.spring_project.Entity;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.Size;

@Entity
public class Cliente extends Pessoa {

	@Size(min = 3, message = "O endereco deve ter pelo menos 3 caracteres")
	private String endereco;

	@Size(min = 3, message = "O email deve ter pelo menos 3 caracteres")
	private String email;

	public Cliente() {
		super();
	}

	public Cliente(Integer id, String usuario, String senha, Boolean is_admin, String endereco, String email) {
		super(id, usuario, senha, is_admin);
		this.endereco = endereco;
		this.email = email;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Cliente [endereco=" + endereco + ", email=" + email + "]";
	}

}
