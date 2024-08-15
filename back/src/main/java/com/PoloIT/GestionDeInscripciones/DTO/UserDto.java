package com.PoloIT.GestionDeInscripciones.DTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserDto {
    private Long id;

    @NotEmpty(message = "Email required")
    @NotNull(message = "Email required")
    @Pattern(regexp = ".*(^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$)", message = "Email not valid")
    private String email;

    @NotEmpty(message = "Password required")
    @Length(min = 7, max = 20, message = "Password min 8 and max 20")
    private String password;

    private String rol;
}
