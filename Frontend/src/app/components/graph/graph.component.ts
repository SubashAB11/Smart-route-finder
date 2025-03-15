import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { GraphComponent as NgxGraphComponent } from '@swimlane/ngx-graph';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NodeDialogComponent } from '../node-dialog/node-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule, NgxGraphModule, FormsModule, MatToolbarModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  public dialog = inject(MatDialog);
  @ViewChild('nodeTemplate') nodeTemplate: any;
  @ViewChild(NgxGraphComponent) ngxGraph!: NgxGraphComponent;

  nodes = [
    { id: '1', label: 'Node A' },
    { id: '2', label: 'Node B' },
    { id: '3', label: 'Node C' },
    { id: '4', label: 'Node D' },
    { id: '5', label: 'Node E' },
    { id: '6', label: 'Node F' }
  ];

  links = [
    { id: 'a', source: '1', target: '2', label: '5', color: 'black', weight: 2 },
    { id: 'b', source: '1', target: '3', label: '3', color: 'black', weight: 4 },
    { id: 'c', source: '3', target: '4', label: '2', color: 'black', weight: 6 },
    { id: 'd', source: '3', target: '5', label: '4', color: 'black', weight: 2 },
    { id: 'e', source: '4', target: '5', label: '1', color: 'black', weight: 3 },
    { id: 'f', source: '2', target: '6', label: '6', color: 'black', weight: 1 }
  ];

  openDialog(action: string) {
    const dialogRef = this.dialog.open(NodeDialogComponent, {
      width: '300px',
      data: { action, nodes: this.nodes }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'add') {
          this.addNode(result.node, result.links);
        } else if (action === 'remove') {
          this.removeNode(result);
        } else if (action === 'distance') {
          this.findDistance(result.src, result.dest);
        }
      }
    });
  }

  findDistance(src: string, dest: string) {
    this.http
      .post<string[]>(`http://localhost:8080/routes/shortest?src=${src}&dest=${dest}`, this.links)
      .subscribe(data => {
        if (data?.length > 1) {
          this.links.forEach(link => link.color = "black");
          for (let i = 0; i < data.length - 1; i++) {
            const link = this.links.find(link => (link.source === data[i] && link.target === data[i + 1]) || (link.source === data[i + 1] && link.target === data[i]));
            if (link) link.color = "blue";
          }
          this.links = [...this.links];
          console.log(data);
        }

        
      });
  }

  addNode(newNode: any, newLinks: any[]) {
    this.nodes.push({
      id: newNode.id,
      label: newNode.label
    });

    newLinks.forEach((link, index) => {
      this.links.push({
        id: `link-${newNode.id}-${index}`,
        source: newNode.id,
        target: link.target,
        label: link.weight.toString(),
        color: 'brown',
        weight: link.weight
      });
    });

    this.nodes = [...this.nodes];
    this.links = [...this.links];

    this.cdr.detectChanges();
  }

  removeNode(nodeId: string) {
    this.nodes = this.nodes.filter(node => node.id !== nodeId);
    this.links = this.links.filter(link => link.source !== nodeId && link.target !== nodeId);
  }
}
