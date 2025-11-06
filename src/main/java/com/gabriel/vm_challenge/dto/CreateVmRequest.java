package com.seunome.vmchallenge.dto;

import jakarta.validation.constraints.*;

public record CreateVmRequest(
        @NotBlank String name,
        @NotNull @Min(1) Integer cpu,
        @NotNull @Min(256) Integer memoryMb,
        @NotNull @Min(1) Integer diskGb,
        @NotBlank String region
) {}
