import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-node-dialog',
  imports: [CommonModule, FormsModule, MatToolbarModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './node-dialog.component.html',
  styleUrl: './node-dialog.component.css'
})
export class NodeDialogComponent {
  newNode = { id: '', label: '' };
  selectedNodeId: string = '';
  sourceNode: string = '';
  destNode: string = '';
  links: { target: string; weight: number }[] = [];

  constructor(
    public dialogRef: MatDialogRef<NodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addLink(): void {
    this.links.push({ target: '', weight: 1 });
  }

  removeLink(index: number): void {
    this.links.splice(index, 1);
  }

  confirmAction(): void {
    if (this.data.action === 'add') {
      this.dialogRef.close({ node: this.newNode, links: this.links });
    } else if (this.data.action === 'remove') {
      this.dialogRef.close(this.selectedNodeId);
    } else if (this.data.action === 'distance' && this.sourceNode !== this.destNode) {
      this.dialogRef.close({src: this.sourceNode, dest: this.destNode});
    }
  }

}
