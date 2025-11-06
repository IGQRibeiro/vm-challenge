package com.seunome.vmchallenge.dto;

import com.seunome.vmchallenge.domain.VmStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateStatusRequest(@NotNull VmStatus status) {}
