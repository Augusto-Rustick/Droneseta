package dsw.trabalho_final.spring_project.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.validation.constraints.NotNull;

@Entity
public class Pedido {

	@Id
	@GeneratedValue
	private Integer id;

	@NotNull
	@JoinColumn(name = "cliente_id")
	protected Integer cliente;

	@NotNull
	protected Integer produto;

	@NotNull
	protected Integer quantidade;

	@NotNull
	protected Integer situacao;

	public Pedido() {
	}

	public Pedido(Integer id, Integer cliente, Integer produto, Integer quantidade, Integer situacao) {
		this.id = id;
		this.cliente = cliente;
		this.produto = produto;
		this.quantidade = quantidade;
		this.situacao = situacao;
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

	public Integer getProduto() {
		return produto;
	}

	public void setProduto(Integer produto) {
		this.produto = produto;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

	public Integer getSituacao() {
		return situacao;
	}

	public void setSituacao(Integer situacao) {
		this.situacao = situacao;
	}

	@Override
	public String toString() {
		return "Pedido [id=" + id + ", cliente=" + cliente + ", produto=" + produto + ", quantidade=" + quantidade
				+ ", situacao=" + situacao + "]";
	}

}
