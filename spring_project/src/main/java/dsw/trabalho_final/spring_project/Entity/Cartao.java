package dsw.trabalho_final.spring_project.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class Cartao {

	@Id
	@GeneratedValue
	private Integer id;

	@NotNull
	protected Integer cliente;

	@NotNull
	private String numero;

	@NotNull
	private String validade;

	@NotNull
	private String cvc;

	public Cartao() {
	}

	public Cartao(Integer id, Integer cliente, String numero, String validade, String cvc) {
		this.id = id;
		this.cliente = cliente;
		this.numero = numero;
		this.validade = validade;
		this.cvc = cvc;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getCliente() {
		return cliente;
	}

	public void setCliente(Integer cliente) {
		this.cliente = cliente;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getValidade() {
		return validade;
	}

	public void setValidade(String validade) {
		this.validade = validade;
	}

	public String getCvc() {
		return cvc;
	}

	public void setCvc(String cvc) {
		this.cvc = cvc;
	}

	@Override
	public String toString() {
		return "Cartao [id=" + id + ", cliente=" + cliente + ", numero=" + numero + ", validade=" + validade + ", cvc="
				+ cvc + "]";
	}

}
