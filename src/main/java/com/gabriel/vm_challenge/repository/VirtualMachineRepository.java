package com.gabriel.vm_challenge.repository;

import com.gabriel.vm_challenge.domain.VirtualMachine;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface VirtualMachineRepository extends JpaRepository<VirtualMachine, UUID> { }
