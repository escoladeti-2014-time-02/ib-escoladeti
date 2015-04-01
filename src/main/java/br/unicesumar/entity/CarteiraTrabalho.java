

package br.unicesumar.entity;


import javax.persistence.Entity;

@Entity
public class CarteiraTrabalho extends Documento{
    
    /**
	 * 
	 */
	private static final long serialVersionUID = -6082416268565727510L;

    private String pis;
    
    private String nis;

    public String getPis() {
        return pis;
    }

    public void setPis(String pis) {
        this.pis = pis;
    }

    public String getNis() {
        return nis;
    }

    public void setNis(String nis) {
        this.nis = nis;
    }
    
    
    
    
}
