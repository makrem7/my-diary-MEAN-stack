import { Component, OnDestroy, OnInit } from '@angular/core';
import { DiaryEntry } from '../shared/diary-entry.model';
import { DiaryDataService } from '../shared/diary-data.component';
import { Subject, Subscription } from "rxjs";


@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit , OnDestroy{

  diaryEntries:DiaryEntry[];
  diarySubscription = new Subscription();
  constructor(private diaryDataService : DiaryDataService){}
  ngOnInit(): void {
    this.diarySubscription= this.diaryDataService.diarySubject.subscribe(
      diaryEntries=> {this.diaryEntries=diaryEntries}
    );
    this.diaryEntries=this.diaryDataService.diaryEntries;

  }
  onDelete(index: number): void {
    this.diaryDataService.onDelete(index)
  }
  ngOnDestroy(): void {
    this.diarySubscription.unsubscribe();
  }

}
