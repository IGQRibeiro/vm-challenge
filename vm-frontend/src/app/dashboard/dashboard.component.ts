import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmService } from '../core/vm.service';
import { VM } from '../models/vm';
import {
  Chart,
  ChartConfiguration,
  ChartType,
  registerables
} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  vms: VM[] = [];
  maxVms = 5;

  runningCount = 0;
  pausedCount = 0;
  stopCount = 0;

  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieCanvas') pieCanvas!: ElementRef<HTMLCanvasElement>;

  private barChart?: Chart;
  private pieChart?: Chart;

  constructor(private vmService: VmService) {}

  ngOnInit(): void {
    this.vmService.list().subscribe(vms => {
      this.vms = vms;
      this.updateCounters();
      this.updateCharts();
    });
  }

  ngAfterViewInit(): void {
    this.updateCharts();
  }

  private updateCounters(): void {
    this.runningCount = this.vms.filter(v => v.status === 'RUNNING').length;
    this.pausedCount  = this.vms.filter(v => v.status === 'PAUSED').length;
    this.stopCount    = this.vms.filter(v => v.status === 'STOP').length;
  }

  private updateCharts(): void {
    if (!this.barCanvas || !this.pieCanvas) {
      return;
    }

    // dados do grafico de barras
    const barData: ChartConfiguration['data'] = {
      labels: ['RUNNING', 'PAUSED', 'STOP'],
      datasets: [
        {
          label: 'VMs por status',
          data: [this.runningCount, this.pausedCount, this.stopCount]
        }
      ]
    };

    // dados do grafico pizza
    const total = this.vms.length;
    const remaining = this.maxVms > total ? this.maxVms - total : 0;

    const pieData: ChartConfiguration['data'] = {
      labels: ['Total de VMs', 'Limite (5)'],
      datasets: [
        {
          data: [total, remaining]
        }
      ]
    };

    // cria ou atualiza barras
    if (this.barChart) {
      this.barChart.data = barData;
      this.barChart.update();
    } else {
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'bar' as ChartType,
        data: barData
      });
    }

    // cria ou atualiza grafico pizza
    if (this.pieChart) {
      this.pieChart.data = pieData;
      this.pieChart.update();
    } else {
      this.pieChart = new Chart(this.pieCanvas.nativeElement, {
        type: 'pie' as ChartType,
        data: pieData
      });
    }
  }
}
