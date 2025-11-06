package com.gabriel.vm_challenge.dto;

import com.gabriel.vm_challenge.domain.VmStatus;
import jakarta.validation.constraints.NotNull;

public class UpdateStatusRequest {

    @NotNull
    private VmStatus status;

    public UpdateStatusRequest() {}

    public VmStatus getStatus() { return status; }
    public void setStatus(VmStatus status) { this.status = status; }
}
