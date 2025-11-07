package com.gabriel.vm_challenge.domain;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
public class VirtualMachine {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer cpu;        // vCPUs

    @Column(nullable = false)
    private Integer memoryMb;   // memória em MB

    @Column(nullable = false)
    private Integer diskGb;     // disco em GB

    @Column(nullable = false)
    private String region;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VmStatus status = VmStatus.RUNNING;

    // Getters e setters
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
