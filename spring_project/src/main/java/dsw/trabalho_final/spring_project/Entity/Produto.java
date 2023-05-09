package dsw.trabalho_final.spring_project.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class Produto {

	@Id
	@GeneratedValue
	private Integer id;

	@NotNull
	private String nome;

	@NotNull
	private String codigo;
	
	@NotNull
	private String tamanho;
	
	@NotNull
	private double preco;

	public Produto() {
	}

	public Produto(Integer id, String nome, String codigo, String tamanho, double preco) {
		super();
		this.id = id;
		this.nome = nome;
		this.codigo = codigo;
		this.tamanho = tamanho;
		this.preco = preco;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public String getTamanho() {
		return tamanho;
	}

	public void setTamanho(String tamanho) {
		this.tamanho = tamanho;
	}

	public double getPreco() {
		return preco;
	}

	public void setPreco(double preco) {
		this.preco = preco;
	}

	@Override
	public String toString() {
		return "Camisa [id=" + id + ", nome=" + nome + ", codigo=" + codigo + ", tamanho=" + tamanho + ", preco="
				+ preco + "]";
	}

}
