package com.gabriel.vm_challenge.dto;

import com.gabriel.vm_challenge.domain.VmStatus;

import java.util.UUID;

public class VirtualMachineResponse {
    private UUID id;
    private String name;
    private Integer cpu;
    private Integer memoryMb;
    private Integer diskGb;
    private String region;
    private VmStatus status;

    public VirtualMachineResponse() {}

    public VirtualMachineResponse(UUID id, String name, Integer cpu, Integer memoryMb,
                                  Integer diskGb, String region, VmStatus status) {
        this.id = id;
        this.name = name;
        this.cpu = cpu;
        this.memoryMb = memoryMb;
        this.diskGb = diskGb;
        this.region = region;
        this.status = status;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

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

    public VmStatus getStatus() { return status; }
    public void setStatus(VmStatus status) { this.status = status; }
}
