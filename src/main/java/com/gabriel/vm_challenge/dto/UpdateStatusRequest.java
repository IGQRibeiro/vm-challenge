package com.gabriel.vm_challenge.dto;

import com.gabriel.vm_challenge.domain.VmStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateStatusRequest(@NotNull VmStatus status) {}
