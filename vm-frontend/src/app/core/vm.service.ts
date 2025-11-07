import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VM } from '../models/vm';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class VmService {
  private api = 'http://localhost:8080/vms';
  private storageKey = 'vms';

  constructor(private http: HttpClient) {}

  list(): Observable<VM[]> {
    const local = this.getLocal();
    return of(local);
  }

  create(vm: Partial<VM>): Observable<VM> {
    const local = this.getLocal();

    const newVm: VM = {
      id: crypto.randomUUID(),
      name: vm.name || 'Nova VM',
      cpu: vm.cpu || 1,
      memoryMb: vm.memoryMb || 1024,
      diskGb: vm.diskGb || 20,
      region: vm.region || 'us-east-1',
      status: 'RUNNING'
    };

    local.push(newVm);
    this.saveLocal(local);
    return of(newVm);
  }

  updateStatus(id: string, status: string): Observable<VM | null> {
    const local = this.getLocal();
    const vm = local.find(v => v.id === id);
    if (!vm) return of(null);

    vm.status = status as any;
    this.saveLocal(local);
    return of(vm);
  }

  delete(id: string): Observable<void> {
    const updated = this.getLocal().filter(v => v.id !== id);
    this.saveLocal(updated);
    return of(void 0);
  }

  // helpers
  private getLocal(): VM[] {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch {
      return [];
    }
  }

  private saveLocal(vms: VM[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(vms));
  }
}
