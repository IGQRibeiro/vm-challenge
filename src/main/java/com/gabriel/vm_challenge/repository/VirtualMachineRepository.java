package com.gabriel.vm_chellenge.repository;

import com.gabriel.vm_chellenge.domain.VirtualMachine;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface VirtualMachineRepository extends JpaRepository<VirtualMachine, UUID> { }
