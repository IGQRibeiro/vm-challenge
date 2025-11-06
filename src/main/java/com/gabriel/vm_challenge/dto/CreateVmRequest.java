package com.gabriel.vm_challenge.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateVmRequest {

    @NotBlank
    private String name;

    @NotNull @Min(1)
    private Integer cpu;

    @NotNull @Min(256)
    private Integer memoryMb;

    @NotNull @Min(1)
    private Integer diskGb;

    @NotBlank
    private String region;

    public CreateVmRequest() {} // Jackson precisa do no-args

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getCpu() { return cpu; }
    public void setCpu(Integer cpu) { this.cpu = cpu; }

    public Integer getMemoryMb() { return memoryMb; }
    public void setMemoryMb(Integer memoryMb) { this.memoryMb = memoryMb; }

    public Integer getDiskGb() { return diskGb; }
    public void setDiskGb(Integer diskGb) { this.diskGb = diskGb; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }
}
