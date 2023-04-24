package dsw.trabalho_final.spring_project.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public abstract class Pessoa {
    @Id
    @GeneratedValue
    private Integer id;

    @NotNull
    protected String email;

    @NotNull
    protected String senha;

    @NotNull
    protected Boolean is_admin;

    public Pessoa() {
    }

    public Pessoa(Integer id, String email, String senha, Boolean is_admin) {
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.is_admin = is_admin;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Boolean getIs_admin() {
        return is_admin;
    }

    public void setIs_admin(Boolean is_admin) {
        this.is_admin = is_admin;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", senha='" + senha + '\'' +
                ", is_admin=" + is_admin +
                '}';
    }
}
