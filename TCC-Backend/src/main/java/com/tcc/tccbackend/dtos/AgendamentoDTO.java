import com.tcc.tccbackend.models.Paciente;
import com.tcc.tccbackend.models.Profissional;
import com.tcc.tccbackend.models.Servico;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgendamentoDTO {
    private Integer id;
    private String data;
    private Servico servico;
    private Paciente paciente;
    private Profissional profissional;
}