package dsw.trabalho_final.spring_project.Entity;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.Size;

@Entity
public class Cliente extends Pessoa {

   @Size(min = 3, message = "O endereco deve ter pelo menos 3 caracteres")
   private String endereco;

   @Size(min = 3, message = "O email deve ter pelo menos 3 caracteres")
   private String email;

   @Size(min = 3, message = "O CPF deve ter pelo menos 3 caracteres")
   private String cpf;

   @Size(min = 3, message = "O endereço de entrega deve ter pelo menos 3 caracteres")
   private String enderecoEntrega;

   public Cliente() {
      super();
   }

   public Cliente(Integer id, String usuario, String senha, Boolean is_admin, String endereco,
                  String email, String enderecoEntrega, String cpf) {
      super(id, usuario, senha, is_admin);
      this.endereco = endereco;
      this.email = email;
      this.cpf = cpf;
      this.enderecoEntrega = enderecoEntrega;
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

   public String getCpf() {
      return cpf;
   }

   public void setCpf(String cpf) {
      this.cpf = cpf;
   }

   public String getEnderecoEntrega() {
      return enderecoEntrega;
   }

   public void setEnderecoEntrega(String enderecoEntrega) {
      this.enderecoEntrega = enderecoEntrega;
   }

   @Override
   public String toString() {
      return "Cliente{" +
              "endereco='" + endereco + '\'' +
              ", email='" + email + '\'' +
              ", cpf='" + cpf + '\'' +
              ", enderecoEntrega='" + enderecoEntrega + '\'' +
              ", usuario='" + usuario + '\'' +
              ", senha='" + senha + '\'' +
              ", is_admin=" + is_admin +
              '}';
   }
}
