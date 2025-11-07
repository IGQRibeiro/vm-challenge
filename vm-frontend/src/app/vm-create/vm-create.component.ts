import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VmService } from '../core/vm.service';
import { VM } from '../models/vm';

@Component({
  selector: 'app-vm-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vm-create.component.html',
  styleUrls: ['./vm-create.component.scss']
})
export class VmCreateComponent implements OnInit {
  name = '';
  cpu: number | null = null;
  memoryMb: number | null = null;
  diskGb: number | null = null;
  region = 'us-east-1';

  error = '';

  private currentVms: VM[] = [];
  private readonly maxVms = 5;

  constructor(
    private vmService: VmService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vmService.list().subscribe(vms => {
      this.currentVms = vms;
      localStorage.setItem('vms', JSON.stringify(vms));
    });
  }

  get memoryGb(): string {
    if (!this.memoryMb || this.memoryMb <= 0) return '0';
    return (this.memoryMb / 1024).toFixed(1);
  }

  onSubmit() {
    this.error = '';

    if (!this.name || this.name.trim().length < 5) {
      this.error = 'Nome deve ter pelo menos 5 caracteres.';
      return;
    }

    if (this.currentVms.length >= this.maxVms) {
      this.error = 'Limite máximo de 5 VMs atingido.';
      return;
    }

    if (this.cpu == null || !Number.isInteger(this.cpu) || this.cpu <= 0) {
      this.error = 'CPU deve ser um número inteiro maior que 0.';
      return;
    }

    if (this.memoryMb == null || this.memoryMb <= 0) {
      this.error = 'Memória (MB) é obrigatória e deve ser maior que 0.';
      return;
    }

    if (this.diskGb == null || this.diskGb <= 0) {
      this.error = 'Disco (GB) é obrigatório e deve ser maior que 0.';
      return;
    }

    const payload = {
      name: this.name.trim(),
      cpu: this.cpu,
      memoryMb: this.memoryMb,
      diskGb: this.diskGb,
      region: this.region.trim() || 'us-east-1'
    };

    this.vmService.create(payload).subscribe({
      next: () => {
        // service já salvou no LocalStorage
        this.router.navigate(['/vms']);
      },
      error: () => {
        this.error = 'Erro ao cadastrar a máquina virtual.';
      }
    });
  }


  onBack() {
    this.router.navigate(['/vms']);
  }
}
