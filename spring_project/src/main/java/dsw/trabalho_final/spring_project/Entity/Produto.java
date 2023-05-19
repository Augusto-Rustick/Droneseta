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

   @NotNull
   private String tipo;

   @NotNull
   private String descricao;

   public Produto() {
   }

   public Produto(Integer id, String nome, String codigo, String tamanho, double preco, String tipo, String descricao) {
      super();
      this.id = id;
      this.nome = nome;
      this.codigo = codigo;
      this.tamanho = tamanho;
      this.preco = preco;
      this.tipo = tipo;
      this.descricao = descricao;
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

   public String getTipo() {
      return tipo;
   }

   public void setTipo(String tipo) {
      this.tipo = tipo;
   }

   public String getDescricao() {
      return descricao;
   }

   public void setDescricao(String descricao) {
      this.descricao = descricao;
   }

   @Override
   public String toString() {
      return "Produto{" +
              "id=" + id +
              ", nome='" + nome + '\'' +
              ", codigo='" + codigo + '\'' +
              ", tamanho='" + tamanho + '\'' +
              ", preco=" + preco +
              ", tipo='" + tipo + '\'' +
              ", descricao='" + descricao + '\'' +
              '}';
   }
}
