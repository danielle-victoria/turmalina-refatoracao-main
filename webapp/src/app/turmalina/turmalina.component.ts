import { Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-turmalina',
  templateUrl: './turmalina.component.html',
  styleUrls: ['./turmalina.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TurmalinaComponent {
  title = 'turmalina';

}
