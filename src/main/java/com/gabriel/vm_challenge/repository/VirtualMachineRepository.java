package com.seunome.vmchallenge.repository;

import com.seunome.vmchallenge.domain.VirtualMachine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VirtualMachineRepository extends JpaRepository<VirtualMachine, UUID> { }
