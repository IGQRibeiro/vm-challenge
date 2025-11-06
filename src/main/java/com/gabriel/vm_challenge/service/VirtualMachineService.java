package com.gabriel.vm_chellenge.service;

import com.gabriel.vm_chellenge.domain.VirtualMachine;
import com.gabriel.vm_chellenge.domain.VmStatus;
import com.gabriel.vm_chellenge.dto.CreateVmRequest;
import com.gabriel.vm_chellenge.dto.VirtualMachineResponse;
import com.gabriel.vm_chellenge.repository.VirtualMachineRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;

@Service
public class VirtualMachineService {

    private final VirtualMachineRepository repo;

    public VirtualMachineService(VirtualMachineRepository repo) {
        this.repo = repo;
    }

    @Transactional
    public VirtualMachineResponse create(CreateVmRequest req) {
        VirtualMachine vm = new VirtualMachine();
        vm.setName(req.name());
        vm.setCpu(req.cpu());
        vm.setMemoryMb(req.memoryMb());
        vm.setDiskGb(req.diskGb());
        vm.setRegion(req.region());
        vm.setStatus(VmStatus.PROVISIONING);
        vm = repo.save(vm);
        return toResponse(vm);
    }

    @Transactional(readOnly = true)
    public List<VirtualMachineResponse> list() {
        return repo.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public VirtualMachineResponse get(UUID id) {
        VirtualMachine vm = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("VM not found: " + id));
        return toResponse(vm);
    }

    @Transactional
    public VirtualMachineResponse updateStatus(UUID id, VmStatus newStatus) {
        VirtualMachine vm = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("VM not found: " + id));

        if (!isValidTransition(vm.getStatus(), newStatus)) {
            throw new IllegalStateException("Invalid status transition: " + vm.getStatus() + " -> " + newStatus);
        }
        vm.setStatus(newStatus);
        vm = repo.save(vm);
        return toResponse(vm);
    }

    private boolean isValidTransition(VmStatus from, VmStatus to) {
        if (from == to) return true;
        return switch (from) {
            case PROVISIONING -> (to == VmStatus.RUNNING || to == VmStatus.ERROR);
            case RUNNING      -> (to == VmStatus.STOPPED || to == VmStatus.ERROR);
            case STOPPED      -> (to == VmStatus.RUNNING || to == VmStatus.ERROR);
            case ERROR        -> (to == VmStatus.STOPPED || to == VmStatus.RUNNING);
        };
    }

    private VirtualMachineResponse toResponse(VirtualMachine vm) {
        return new VirtualMachineResponse(
                vm.getId(),
                vm.getName(),
                vm.getCpu(),
                vm.getMemoryMb(),
                vm.getDiskGb(),
                vm.getRegion(),
                vm.getStatus()
        );
    }
}
