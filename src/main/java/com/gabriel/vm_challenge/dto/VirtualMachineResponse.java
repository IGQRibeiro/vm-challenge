package com.gabriel.vm_challenge.dto;

import com.gabriel.vm_challenge.domain.VmStatus;
import java.util.UUID;

public record VirtualMachineResponse(
        UUID id,
        String name,
        Integer cpu,
        Integer memoryMb,
        Integer diskGb,
        String region,
        VmStatus status
) {}
