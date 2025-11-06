package com.seunome.vmchallenge.dto;

import com.seunome.vmchallenge.domain.VmStatus;
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
