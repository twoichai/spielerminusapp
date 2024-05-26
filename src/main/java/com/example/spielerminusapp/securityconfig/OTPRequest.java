package com.example.spielerminusapp.securityconfig;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class OTPRequest {

    private String newPassword;
    private String confirmationPassword;
}
