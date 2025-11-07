import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VmService } from '../core/vm.service';
import { VM } from '../models/vm';

@Component({
  selector: 'app-vm-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vm-list.component.html',
  styleUrls: ['./vm-list.component.scss']
})
export class VmListComponent implements OnInit {
  vms: VM[] = [];

  constructor(
    private vmService: VmService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVms();
  }

  loadVms() {
    this.vmService.list().subscribe(vms => (this.vms = vms));
  }

  onAdd() {
    this.router.navigate(['/vms/create']);
  }

  onStart(vm: VM) {
    if (vm.status !== 'RUNNING') {
      this.vmService.updateStatus(vm.id, 'RUNNING').subscribe(() => this.loadVms());
    }
  }

  onPause(vm: VM) {
    if (vm.status === 'RUNNING') {
      this.vmService.updateStatus(vm.id, 'PAUSED').subscribe(() => this.loadVms());
    }
  }

  onStop(vm: VM) {
    if (vm.status !== 'STOP') {
      this.vmService.updateStatus(vm.id, 'STOP').subscribe(() => this.loadVms());
    }
  }

  onDelete(vm: VM) {
    if (confirm(`Deseja realmente excluir ${vm.name}?`)) {
      this.vmService.delete(vm.id).subscribe(() => this.loadVms());
    }
  }
}
