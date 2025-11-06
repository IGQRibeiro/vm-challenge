package com.gabriel.vm_challenge.web;

import com.gabriel.vm_challenge.domain.VmStatus;
import com.gabriel.vm_challenge.dto.CreateVmRequest;
import com.gabriel.vm_challenge.dto.UpdateStatusRequest;
import com.gabriel.vm_challenge.dto.VirtualMachineResponse;
import com.gabriel.vm_challenge.service.VirtualMachineService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/vms")
public class VirtualMachineController {

    private final VirtualMachineService service;

    public VirtualMachineController(VirtualMachineService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public VirtualMachineResponse create(@Valid @RequestBody CreateVmRequest req) {
        return service.create(req);
    }

    @GetMapping
    public List<VirtualMachineResponse> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public VirtualMachineResponse get(@PathVariable UUID id) {
        return service.get(id);
    }

    @PatchMapping("/{id}/status")
    public VirtualMachineResponse updateStatus(@PathVariable UUID id,
                                               @Valid @RequestBody UpdateStatusRequest req) {
        return service.updateStatus(id, req.status());
    }

    // Mapeia erros comuns para respostas HTTP claras (sem adicionar features extras)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(IllegalArgumentException.class)
    public String handleNotFound(IllegalArgumentException ex) {
        return ex.getMessage();
    }

    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ExceptionHandler(IllegalStateException.class)
    public String handleInvalidTransition(IllegalStateException ex) {
        return ex.getMessage();
    }
}
